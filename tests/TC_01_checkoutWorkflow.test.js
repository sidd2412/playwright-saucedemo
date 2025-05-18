import test from '../utils/testFixture';
import { expect } from '@playwright/test';
import { config } from '../utils/config'; // Import config settings
import 'allure-playwright';

test('Complete E2E Flow', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    // Step 1: Verify elements

    // Step 2: Login 
    await loginPage.goTo(); 
    await loginPage.performLogin(); 
    await loginPage.validateLoginSuccess();

    // Step 3: Sort Products (Price High to Low)

    await inventoryPage.sortByPriceHighToLow(); 
    
    const topProducts = await inventoryPage.getTopProducts(2); 
    await inventoryPage.addProductsToCart(topProducts); 
    await inventoryPage.goToCart();

    // Step 4: API/UI data validation here
    const { uiData, backendData } = await cartPage.validateCartDataAgainstBackend();

    for (const uiItem of uiData) {
        const matchedItem = backendData.find(item => item.name === uiItem.name);
        expect(matchedItem, `Product ${uiItem.name} not found in backend data`).toBeDefined();
        expect(uiItem.price).toBeCloseTo(matchedItem.price, 2);
    }

    // Step 5: Checkout
    await cartPage.getCartItems();
    await cartPage.proceedToCheckout();

    // Step 6: Enter Checkout Details 
    await checkoutPage.fillCheckoutDetails('Sample', 'Test', 'ABCDE');

    const expectedTotal = topProducts.reduce((sum, p) => sum + parseFloat(p.price), 0);
    await checkoutPage.getTotalFromSummary(expectedTotal);

    // Step 7: Complete Order & Verify Success Message
    await checkoutPage.completePurchase();
    await expect(checkoutPage.locators.successMessage).toContainText('Thank you for your order!');

});
