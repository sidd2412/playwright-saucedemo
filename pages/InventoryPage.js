const BasePage = require('./BasePage');
const { inventoryPageElements } = require('../pageobjects/inventoryPageElements');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.locators = {
            sortDropdown: page.locator(inventoryPageElements.sortDropdown),
            inventoryItems: page.locator(inventoryPageElements.inventoryItems),
            cartIcon: page.locator(inventoryPageElements.cartIcon),
        };
    }

    async sortByPriceHighToLow() {
        await this.waitAndClick(this.locators.sortDropdown);
        await this.locators.sortDropdown.selectOption('hilo');
    }

    async getTopProducts(count = 2) {
    const products = [];
    const itemCount = await this.locators.inventoryItems.count();

    for (let i = 0; i < itemCount; i++) {
        const item = this.locators.inventoryItems.nth(i);
        const name = (await item.locator(inventoryPageElements.productNames).textContent()).trim();
        const priceText = (await item.locator(inventoryPageElements.productPrices).textContent()).trim();
        const price = parseFloat(priceText.replace('$', ''));

        const buttonEl = item.locator(inventoryPageElements.addToCartButtons); 

        products.push({ name, price, buttonEl });
    }

    // Sort by price (high to low)
    products.sort((a, b) => b.price - a.price);

    return products.slice(0, count);
    }

    async addProductsToCart(products) {
    for (const product of products) {
        console.log(`Adding to cart: ${product.name} - $${product.price}`);
        await this.waitAndClick(product.buttonEl);  
        }
    }

    async goToCart() {
    await this.waitAndClick(this.locators.cartIcon);
    
}

}

module.exports = InventoryPage;
