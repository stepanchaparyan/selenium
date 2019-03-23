import { expect } from 'chai';
import { Builder } from 'selenium-webdriver';
import DashboardPage from '../src/dashboardSection/dashboardPage';
import LoginPage from '../src/login/loginPage';
import chromeOptions from '../settings/chromeOptions';

describe('DefaultTest', () => {
	let driver, loginPage, dashboardPage;
	before(async () => {
		driver = new Builder().forBrowser('chrome')
		.setChromeOptions(chromeOptions).build();
		loginPage = new LoginPage(driver);
		dashboardPage = new DashboardPage(driver);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await driver.quit();
	});

	it('messagesPast7DaysExist', async () => {
		expect(await dashboardPage.messagesPast7DaysExist()).to.equal(true);
	});
	it('messagesPast7DaysMessages', async () => {
		expect(await dashboardPage.messagesPast7DaysMessages()).to.equal('MESSAGES');
	});
	it('messagesPast7DaysText', async () => {
		expect(await dashboardPage.messagesPast7DaysText()).to.equal('Past 7 Days');
	});
});