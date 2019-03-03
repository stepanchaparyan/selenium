import { expect } from 'chai';
import { Builder, By, Key, until } from 'selenium-webdriver';
import FlowBot from '../src/pageObjects/importantActionsPO';
import LoginPage from '../src/pageObjects/loginPagePO';

// import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
// import firefox from 'selenium-webdriver/firefox';

let options = new chrome.Options();
options.addArguments('headless');

let caps = {
	name : 'Basic Test Example',
	//build :  '1.0',
	//version : '70',
	//platform : 'Windows 10',
	//screen_resolution : '1366x768',
	record_video : 'true',
	//record_network : 'false',
	browserName : 'chrome'
	//username : username,
	//password : authkey
};


describe('DefaultTest', () => {
	let driver, loginPage, flowBot;
	let dashboardPage = 'dashboard';

	describe('Simple Flow Bot - Important Actions', () => {
		before(async () => {
			driver = new Builder().forBrowser('chrome')
			//.setChromeOptions(options)
			//.withCapabilities(caps)
			.build();
			//driver.manage().window().maximize();
			//driver.manage().deleteAllCookies();;
			flowBot = new FlowBot(driver);
			loginPage = new LoginPage(driver);
			await loginPage.open(dashboardPage);
			await loginPage.logIn();
		});
		after(async () => {
			await driver.quit();
		});

		it('test', async () => {
			expect(await flowBot.createBotByImportantActionDoc()).to.equal(true);
		});
	});

	// const driver = new Builder()
	// .forBrowser('firefox')
	// .forBrowser('chrome')
	// .setChromeOptions(/* ... */)
	// .setFirefoxOptions(/* ... */)
	// .build();
});
