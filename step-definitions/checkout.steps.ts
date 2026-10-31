import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@wdio/globals'
import productsPage from '../pageobjects/products.page'
import { CartPage } from '../pageobjects/cart.page'
import { CheckoutPage } from '../pageobjects/checkout.page'
import { validUser, checkoutInfo } from '../utils/test-data'

const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()

Given('I am logged in', async function () {
  await browser.url('/')
  const username = $('#user-name')
  const password = $('#password')
  const loginBtn = $('#login-button')

  await username.setValue(validUser.username)
  await password.setValue(validUser.password)
  await loginBtn.click()
  await productsPage.assertOnProductsPage()
})

When('I select a product and add it to the cart', async function () {
  await productsPage.addFirstItemToCart()
})

Then('I should be able to complete the purchase', async function () {
  await productsPage.goToCart()
  await cartPage.goToCheckoutAttempt()

  await checkoutPage.fillCheckoutForm(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.postalCode
  )
  await checkoutPage.continue()

  // Checkout step 2: finish
  await checkoutPage.finish()
  await checkoutPage.assertOrderComplete()
})

Given('I am on the empty cart', async function () {
  await browser.url('/')
  const username = $('#user-name')
  const password = $('#password')
  const loginBtn = $('#login-button')

  await username.setValue(validUser.username)
  await password.setValue(validUser.password)
  await loginBtn.click()
  await productsPage.assertOnProductsPage()

  // Go to Cart without products
  await productsPage.goToCart()
  await cartPage.assertCartEmpty()
})

When('I attempt to complete the purchase without adding products', async function () {
  // await cartPage.goToCheckoutAttempt()
  cartPage.assertCartEmpty()
})

Then('checkout should not be allowed', async function () {
  const url = await browser.getUrl()
  expect(url).toContain('/cart.html')
})