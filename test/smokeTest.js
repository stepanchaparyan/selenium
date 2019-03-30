import { expect } from 'chai';
import { Builder } from 'selenium-webdriver';
import LoginPage from '../src/login/loginPage';
import SmokeTestingPage from '../src/smokeTesting/smokeTestingPage';
import chromeOptions from '../settings/chromeOptions';

describe('Smoke Test', () => {
	let driver, loginPage, smokeTestingPage;
	before(async () => {
		driver = new Builder().forBrowser('chrome')
		.setChromeOptions(chromeOptions).build();
		loginPage = new LoginPage(driver);
		smokeTestingPage = new SmokeTestingPage(driver);
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
		await smokeTestingPage.createFlowBot();
		await smokeTestingPage.createFreeTextQuestion();
		await smokeTestingPage.createOptionsQuestion();
		await smokeTestingPage.createMultipleOptionQuestion();
		await smokeTestingPage.createNestedFreeTextQuestion();
		await smokeTestingPage.createDatepickerQuestion();
		await smokeTestingPage.createLocationQuestion();
		await smokeTestingPage.createReferenceLocationQuestion();
		await smokeTestingPage.createURLQuestion();
		await smokeTestingPage.sliderQuestion();
		await smokeTestingPage.customSliderQuestion();
	});


});