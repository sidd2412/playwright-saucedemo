const BasePage = require('./BasePage');
const { loginPageElements } = require('../pageobjects/loginPageElements'); 
const { config } = require('../utils/config'); 

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page; 

        this.locators = {
            
            userNameInput: page.locator(loginPageElements.userNameInput),
            passwordInput: page.locator(loginPageElements.passwordInput),
            loginButton: page.locator(loginPageElements.loginButton),
            errorMessage: page.locator(loginPageElements.errorMessage),
        };
    }

    async goTo() {
        await this.page.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });
    }


    async performLogin() {
        await this.waitAndFill(this.locators.userNameInput, config.user.username); // Uses dynamic user
        await this.waitAndFill(this.locators.passwordInput, config.user.password);
        await this.waitAndClick(this.locators.loginButton);
    }

    async validateLoginSuccess() {
        await this.page.waitForURL(/inventory.html/);
    }

    async validateLoginFailure() {
        return await this.locators.errorMessage.isVisible(); 
    }
}

module.exports = LoginPage;
