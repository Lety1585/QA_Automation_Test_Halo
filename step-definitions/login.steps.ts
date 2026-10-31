import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@wdio/globals'
import { LoginPage } from '../pageobjects/login.page'
import { validUser, invalidUser } from '../utils/test-data'
import fs from 'fs'
import path from 'path'

const loginPage = new LoginPage()

Given('I am on the login page', async function () {
  const dir = path.resolve(process.cwd(), 'tmp')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  await loginPage.open()

  const b = globalThis.browser
  console.log('URL actual:', await b.getUrl())
})

When('I enter valid credentials', async function () {
  await loginPage.login(validUser.username, validUser.password)
})

Then('I should see the Products page', async function () {
  const title = await $('[data-test="title"]')
  await title.waitForDisplayed({ timeout: 8000 })
  expect(await title.getText()).toBe('Products')
})

When('I enter invalid credentials', async function () {
  await loginPage.login(invalidUser.username, invalidUser.password)
})

Then('I should see an error message', async function () {
  await loginPage.assertErrorVisible()
})