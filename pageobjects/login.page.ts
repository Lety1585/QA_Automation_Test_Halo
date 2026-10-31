import { expect } from '@wdio/globals'

export class LoginPage {
  get username() { return $('#user-name') }
  get password() { return $('#password') }
  get loginBtn() { return $('#login-button') }
  get errorContainer() { return '[data-test="error"]' }

  async open() {
    await browser.url('/')
  }

  async login(username: string, password: string) {
    await this.username.setValue(username)
    await this.password.setValue(password)
    await this.loginBtn.click()
  }

  async assertErrorVisible(expectedText?: string) {
    const el = await $(this.errorContainer)
    await el.waitForDisplayed({ timeout: 5000 })
    if (expectedText) await expect(el).toHaveText(expectedText)
  }
}