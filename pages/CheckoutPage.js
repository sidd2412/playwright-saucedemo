const BasePage = require('./BasePage');
const { checkoutPage, checkoutPageElements } = require('../pageobjects/checkoutPageElements');
const { config } = require('../utils/config');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = {
            firstNameField: page.locator(checkoutPageElements.firstNameField),
            lastNameField: page.locator(checkoutPageElements.lastNameField),
            postalCodeField: page.locator(checkoutPageElements.postalCodeField), 
            continueButton: page.locator(checkoutPageElements.continueButton),
            finishButton: page.locator(checkoutPageElements.finishButton),
            totalPrice: page.locator(checkoutPageElements.totalPrice),
            itemTotal: page.locator(checkoutPageElements.itemTotal), 
            successMessage: page.locator(checkoutPageElements.orderConfirmationMessage),
        };
        this.selectors = {
            itemName: '.inventory_item_name',
            itemPrice: '.inventory_item_price',
        };
    }

    async fillCheckoutDetails(firstName, lastName, postalCode) {
        await this.waitAndFill(this.locators.firstNameField, firstName);
        await this.waitAndFill(this.locators.lastNameField, lastName);
        await this.waitAndFill(this.locators.postalCodeField, postalCode);
        await this.waitAndClick(this.locators.continueButton);
    }

    async getTotalFromSummary() {
        const totalText = await this.locators.totalPrice.textContent();
        const match = totalText.match(/Total:\s*\$([\d.]+)/);
        return match ? parseFloat(match[1]) : 0;
    }

    async validateTotal(expectedTotal) {
        const itemTotalText = await this.locators.itemTotal.textContent();
        const match = itemTotalText.match(/Item total:\s*\$([\d.]+)/);
        const actual = match ? parseFloat(match[1]) : 0;

        if (Math.abs(actual - expectedTotal) > 0.01) {
            throw new Error(`Expected item total $${expectedTotal} but found $${actual}`);
        }
    }


    async completePurchase() {
        await this.waitAndClick(this.locators.finishButton);
    }
}

module.exports = CheckoutPage;
