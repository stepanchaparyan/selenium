import { expect } from 'chai';
import { Builder } from 'selenium-webdriver';
import LoginPage from '../src/login/loginPage';
import SmogeTestingPage from '../src/smokeTesting/smokeTestingPage';
import chromeOptions from '../settings/chromeOptions';

describe('Smoke Test', () => {
	let driver, loginPage, smogeTestingPage;
	before(async () => {
		driver = new Builder().forBrowser('chrome')
		.setChromeOptions(chromeOptions).build();
		loginPage = new LoginPage(driver);
		smogeTestingPage = new SmogeTestingPage(driver);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await driver.quit();
	});

	it('test', async () => {
		expect(await true).to.equal(true);
	});
	it('createFlowBot', async () => {
		expect(await smogeTestingPage.createFlowBot()).to.equal(true);
		expect(await smogeTestingPage.createFreeTextQuestion()).to.equal(true);
		expect(await smogeTestingPage.createOptionsQuestion()).to.equal(true);

	});


});