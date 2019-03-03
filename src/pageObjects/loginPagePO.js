import CREDS from '../../creds';
import { LOGIN_PAGE } from '../helpers/constants/loginPageConstants.js';
import { Builder, By, Key, until } from 'selenium-webdriver';

export default class LoginPage {
	constructor (driver) {
		this.driver = driver;
	}

	async open (component) {
        return await this.driver.get(`https://app.iox.bot/${component}`);
	}

	async logIn () {
		await this.driver.sleep(500);
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.EMAIL)).sendKeys(CREDS.usernameS);
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.PASSWORD)).sendKeys(CREDS.passwordS);
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.LOGIN_BUTTON)).click();
		await this.driver.sleep(500);
	}
}
