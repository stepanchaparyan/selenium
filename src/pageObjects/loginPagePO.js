import CREDS from '../../settings/creds';
import { LOGIN_PAGE } from '../helpers/constants/loginPageConstants.js';
import { Builder, By, Key, until } from 'selenium-webdriver';

// import faker from 'faker';
// let randomEmail = faker.internet.email();

export default class LoginPage {
	constructor (driver) {
		this.driver = driver;
	}

	async open () {
        return await this.driver.get('https://app.iox.bot');
	}

	async logIn () {
		await this.driver.wait(until.elementLocated(By.css(LOGIN_PAGE.SELECTORS.EMAIL)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.EMAIL)).sendKeys(CREDS.usernameS);
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.PASSWORD)).sendKeys(CREDS.passwordS);
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.LOGIN_BUTTON)).click();
	}
}
