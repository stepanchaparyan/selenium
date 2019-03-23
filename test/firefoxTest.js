import { expect } from 'chai';
import { Builder } from 'selenium-webdriver';
import LoginPage from '../src/pageObjects/loginPagePO';
import Capabilities from '../settings/firefoxCapabilities';

describe('Smoke Test', () => {
	let driver, loginPage;
	before(async () => {
		driver = new Builder().forBrowser('firefox')
		.withCapabilities(Capabilities).build();
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