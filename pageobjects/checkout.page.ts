import { expect } from '@wdio/globals'

export class CheckoutPage {
  get firstName() { return $('#first-name') }
  get lastName() { return $('#last-name') }
  get postalCode() { return $('#postal-code') }
  get continueBtn() { return $('#continue') }

  get finishBtn() { return $('#finish') }
  get successContainer() { return '[data-test="complete-header"]' }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.waitForExist({ timeout: 10000 })
    await this.firstName.waitForDisplayed({ timeout: 10000 })
  
    await this.firstName.setValue(firstName)
    await this.lastName.setValue(lastName)
    await this.postalCode.setValue(postalCode)
  }

  async continue() { await this.continueBtn.click() }
  async finish() { await this.finishBtn.click() }

  async assertOrderComplete() {
    const el = await $(this.successContainer)
    await el.waitForDisplayed({ timeout: 10000 })
    await expect(el).toHaveText('Thank you for your order!')
  }
}