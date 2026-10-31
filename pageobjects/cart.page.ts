import { expect } from '@wdio/globals'

export class CartPage {
  get continueShoppingBtn() { return $('[data-test="continue-shopping"]') }
  get checkoutBtn() { return $('button[data-test="checkout"]') }
  get cartItems() { return $$('[data-test="inventory-item"]') } // (opcional, ver nota abajo)

  async assertCartEmpty() {
    const items = await $$('[data-test="inventory-item"]')
    expect(items.length).toBe(0)
  }

  async goToCheckoutAttempt() {
    await this.checkoutBtn.waitForClickable({ timeout: 5000 })
    await this.checkoutBtn.click()
  }

  async assertCartEmptyError(expectedText?: string) {
    await this.continueShoppingBtn.waitForDisplayed({ timeout: 5000 })

    if (expectedText) {
      const msg = await $('[data-test="cart-empty"]')
      await msg.waitForDisplayed({ timeout: 5000 })
      await expect(msg).toHaveText(expectedText)
    }
  }

  async assertCheckoutNotClickableOrNotPresent() {
    const btn = await $('button[data-test="checkout"]')
    const isDisplayed = await btn.isDisplayed().catch(() => false)
    if (isDisplayed) {
      await expect(btn).not.toBeClickable({ timeout: 5000 })
    }
  }
}