export class ProductsPage {
  get header() { return '[data-test="title"]' }
  get inventoryItems() { return '[data-test="inventory-item"]' }
  get shoppingCartLink() { return $('a[data-test="shopping-cart-link"]') }
  get checkoutBtn() { return $('button[data-test="checkout"]') }

  async assertOnProductsPage() {
    const title = await $(this.header)
    await title.waitForDisplayed({ timeout: 8000 })
    await expect(title).toHaveText('Products')
  }

  async addFirstItemToCart() {
    const items = await $$(this.inventoryItems)
    const firstItem = items[0]
    await firstItem.waitForDisplayed({ timeout: 5000 })

    const addBtn = await firstItem.$('button[data-test="add-to-cart-sauce-labs-backpack"]')
    await addBtn.click()
  }

  async goToCart() {
    await this.shoppingCartLink.click()
    await $('a[data-test="shopping-cart-link"]').waitForDisplayed({ timeout: 5000 })
  }
}
export default new ProductsPage();