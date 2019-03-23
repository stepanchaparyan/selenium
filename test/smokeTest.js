import { expect } from 'chai';
import { Builder } from 'selenium-webdriver';
import LoginPage from '../src/login/loginPage';
import chromeOptions from '../settings/chromeOptions';

describe('Smoke Test', () => {
	let driver, loginPage;
	before(async () => {
		driver = new Builder().forBrowser('chrome')
		.setChromeOptions(chromeOptions).build();
		loginPage = new LoginPage(driver);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await driver.quit();
	});

	it('test', async () => {
		expect(await true).to.equal(true);
	});

});