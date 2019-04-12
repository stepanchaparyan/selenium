import CREDS from '../../settings/creds';
import { LOGIN_PAGE } from '../loginSection/loginPageConstants';
import { By, until } from 'selenium-webdriver';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';

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
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.EMAIL)).sendKeys(CREDS.automationUser);
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.PASSWORD)).sendKeys(CREDS.automationPassword);
		await this.driver.findElement(By.css(LOGIN_PAGE.SELECTORS.LOGIN_BUTTON)).click();
	}
	async logOut() {
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.DROPDOWN)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.DROPDOWN)).click();
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.LOGOUT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.LOGOUT)).click();
	}
}
