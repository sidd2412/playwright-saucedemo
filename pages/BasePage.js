class BasePage {
    constructor(page) {
        this.page = page;
    }

    
    async isElementVisible(locator, timeout = 3000) {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    
    async isElementClickable(locator, timeout = 3000) {
        try {
            await locator.waitFor({ state: 'enabled', timeout });
            return true;
        } catch {
            return false;
        }
    }

    
    async waitAndClick(locator, retries = 3) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await locator.waitFor({ state: 'visible' });
                //await locator.waitFor({ state: 'enabled' });
                //await locator.hover();
                await locator.click();
                return;
            } catch (error) {
                if (attempt === retries) {
                    throw new Error(`Failed to click ${locator} after ${retries} retries`);
                }
                console.warn(`Retry ${attempt}: Clicking failed, retrying...`);
                await this.page.waitForTimeout(1000);
            }
        }
    }

    
    async waitAndFill(locator, text, retries = 3) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await locator.waitFor({ state: 'visible' });
                await locator.fill(text);
                return;
            } catch (error) {
                if (attempt === retries) {
                    throw new Error(`Failed to fill ${locator} with ${text} after ${retries} retries`);
                }
                console.warn(`Retry ${attempt}: Filling failed, retrying...`);
                await this.page.waitForTimeout(500);
            }
        }
    }

    
    async verifyElementText(locator, expectedText, retries = 3) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const elementText = (await locator.textContent())?.trim() || ''; 
                if (elementText === expectedText.trim()) {
                    return true;
                }
                throw new Error(`Attempt ${attempt}: Text mismatch`);
            } catch (error) {
                if (attempt === retries) {
                    throw new Error(`Text mismatch for ${locator} after ${retries} retries`);
                }
                console.warn(`Retry ${attempt}: Text mismatch, retrying...`);
                await this.page.waitForTimeout(500);
            }
        }
    }
}

module.exports = BasePage;
