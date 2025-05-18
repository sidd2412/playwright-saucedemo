const BasePage = require('./BasePage');
const { cartPageElements } = require('../pageobjects/cartPageElements');
const fs = require('fs').promises;


class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.cartItemsLocator = page.locator(cartPageElements.cartItems);
        this.itemNameSelector = cartPageElements.itemName;
        this.itemPriceSelector = cartPageElements.itemPrice;
        this.checkoutButton = page.locator(cartPageElements.checkoutButton);
    }

    async getCartItems() {
        const itemCount = await this.cartItemsLocator.count();
        const items = [];

        for (let i = 0; i < itemCount; i++) {
            const item = this.cartItemsLocator.nth(i);

            const nameLocator = item.locator(this.itemNameSelector);
            const priceLocator = item.locator(this.itemPriceSelector);

            const name = (await nameLocator.textContent())?.trim() || 'Unknown';
            const priceText = await priceLocator.textContent();
            const price = parseFloat(priceText.replace('$', '').trim());

            items.push({ name, price });
        }

        return items;
    }

    async proceedToCheckout() {
        await this.waitAndClick(this.checkoutButton);
    }

        // Fetch Cart Data from UI
    async getCartDataFromUI() {
        return this.getCartItems();
    }

    // Fetch Product Data from Backend Mock (`productData.json`)
    async getCartDataFromBackend() {
        const rawData = await fs.readFile('./data/productData.json', 'utf-8');
        const backendProducts = JSON.parse(rawData).products;
        return backendProducts;
    }

    // Validate Cart Data with Backend
    async validateCartDataAgainstBackend() {
    const uiData = await this.getCartDataFromUI();
    const backendData = await this.getCartDataFromBackend();
    return { uiData, backendData };
  }

}

module.exports = CartPage;
