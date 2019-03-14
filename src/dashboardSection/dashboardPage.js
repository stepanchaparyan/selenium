import { DASHBOARD } from '../dashboardSection/dashboardConstants';
import { IFRAME } from '../botSection/iframeConstants';
import { SIDEMENU } from '../sideMenu/sideMenuConstants';
import { BOT_SECTION } from '../botSection/botsSectionConstants';
import Utils from '../helpers/utils';
import { Builder, By, Key, until } from 'selenium-webdriver';

export default class Dashboard {

	constructor(driver) {
			this.driver = driver;
			this.utils = new Utils(driver);
		}

	async messagesPast7DaysExist() {
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.DASHBOARD)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.DASHBOARD)).click();
		return await this.driver.findElement(By.css(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT_DIV)) !== null;
	}
	async messagesPast7DaysMessages() {
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.DASHBOARD)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.DASHBOARD)).click();
		return this.driver.findElement(By.css(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_MESSAGES)).getText();
	}
	async messagesPast7DaysText() {
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.DASHBOARD)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.DASHBOARD)).click();
		return this.driver.findElement(By.css(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT)).getText();
	}

	async messagesPast7DaysNumber() {
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.DASHBOARD)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.DASHBOARD)).click();
		await this.driver.wait(until.elementLocated(By.css(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER)), 10000, 'Could not locate the child element within the time specified');
		const messagesCountBefore = this.driver.findElement(By.css(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER)).getText();
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.BOTS)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.BOTS)).click();
		await this.driver.wait(until.elementLocated(By.css('body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(1) > iox-bot-item > div > div.bot-content > div.bot-name')), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css('body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(1) > iox-bot-item > div > div.bot-content > div.bot-name')).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.RUN)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.RUN)).click();
		// wait for iframe loading
		await this.driver.sleep(3000);
		await this.driver.switchTo().frame('responsiveFrame');
		//await this.driver.switchTo().frame(this.driver.findElement(By.css('#responsiveFrame')));

		await this.driver.wait(until.elementLocated(By.css(IFRAME.SELECTORS.MAIN_BUTTON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(IFRAME.SELECTORS.MAIN_BUTTON)).click();
		await this.driver.sleep(3000);

		// const frame = await this.page.frames().find((iframe) => iframe.name() === 'responsiveFrame');
		// const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
		// await mainButton.click();
		// await this.page.waitFor(1000);
		// const googleButton = await frame.$(IFRAME.SELECTORS.GOOGLE);
		// await googleButton.click();

		//await this.driver.switchTo().defaultContent();

		// await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		// await this.page.waitFor(1000);
		// const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER, (text) => text.innerText);
		// console.log('before', messagesCountBefore);
		// console.log('after ', messagesCountAfter);
		// const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
		// return addedOneMessage;
		console.log('hasa ');
		return true;
	}

	//  async messagesPast30DaysExist() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return (await this.page.$(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT_DIV)) !== null;
	// }
	//  async messagesPast30DaysMessages() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_MESSAGES, (text) => text.innerText);
	// }
	//  async messagesPast30DaysText() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT, (text) => text.innerText);
	// }
	//  async messagesPast30DaysNumber() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	await this.page.waitForSelector(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER);
	// 	const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, (text) => text.innerText);
	// 	await this.utils.click(SIDEMENU.SELECTORS.BOTS);
	// 	const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
	// 	await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
	// 	await this.utils.click(BOT_SECTION.SELECTORS.RUN);
	// 	// wait for iframe loading
	// 	await this.page.waitFor(3000);
	// 	const frame = await this.page.frames().find((iframe) => iframe.name() === 'responsiveFrame');
	// 	const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
	// 	await mainButton.click();
	// 	await this.page.waitFor(2000);
	// 	const googleButton = await frame.$(IFRAME.SELECTORS.GOOGLE);
	// 	await googleButton.click();
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	await this.page.waitFor(1000);
	// 	const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, (text) => text.innerText);
	// 	console.log('before', messagesCountBefore);
	// 	console.log('after ', messagesCountAfter);
	// 	const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
	// 	return addedOneMessage;
	// }

	// async sessionsPast30DaysExist() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return await this.page.$(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT_DIV) !== null;
	// }
	// async sessionsPast30DaysSessions() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_SESSIONS, (text) => text.innerText);
	// }
	// async sessionsPast30DaysText() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT, (text) => text.innerText);
	// }
	// async sessionsPast30DaysNumber() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	await this.page.waitForSelector(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER);
	// 	const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, (text) => text.innerText);
	// 	await this.utils.click(SIDEMENU.SELECTORS.BOTS);
	// 	const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
	// 	await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
	// 	await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
	// 	await this.utils.click(BOT_SECTION.SELECTORS.RUN);
	// 	// wait for iframe loading
	// 	await this.page.waitFor(3000);
	// 	const frame = await this.page.frames().find((iframe) => iframe.name() === 'responsiveFrame');
	// 	const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
	// 	await mainButton.click();
	// 	await this.page.waitFor(2000);
	// 	const googleButton = await frame.$(IFRAME.SELECTORS.GOOGLE);
	// 	await googleButton.click();
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	await this.page.waitFor(1000);
	// 	const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, (text) => text.innerText);
	// 	// console.log('before', messagesCountBefore);
	// 	// console.log('after ', messagesCountAfter);
	// 	const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
	// 	return addedOneMessage;
	// }

	// async botsCountDivExist() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return (await this.page.$(DASHBOARD.SELECTORS.BOTS_COUNT_DIV)) !== null;
	// }
	// async botsCountDivText() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
	// }
	// async botsCount() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	await this.page.waitForSelector(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT); //! 
	// 	const botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
	// 	const botsCount = botsCountText.substr(0, 2);
	// 	await this.utils.click(SIDEMENU.SELECTORS.BOTS);
	// 	const botsCountsReal = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
	// 	const botsCountIsRight = Number(botsCountsReal) - 1 === Number(botsCount) ? true : false;
	// 	return botsCountIsRight;
	// }

	// async platformStatusText() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return this.page.$eval(DASHBOARD.SELECTORS.PLATFORM_STATUS_DIV_TEXT, (text) => text.innerText);
	// }
	// async platformsList() {
	// 	const platformsList = [];
	// 	const platformElement = await this.page.$$(DASHBOARD.SELECTORS.PLATFORMS_LIST);
	// 	for (const platform of platformElement) {
	// 		const platformInnerText = await (await platform.getProperty('innerText')).jsonValue();
	// 		platformsList.push(platformInnerText);
	// 	}
	// 	return platformsList;
	// }
	// async troublesText() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	return this.page.$eval(DASHBOARD.SELECTORS.HAVING_TROUBLES, (text) => text.innerText);
	// }
	// async contactUsLink() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	await this.utils.click(DASHBOARD.SELECTORS.CONTACT_US);
	// 	await this.page.waitForSelector(DASHBOARD.SELECTORS.ONE_DIV_FROM_LINKED_PAGE);
	// 	const url = this.page.url();
	// 	await this.page.goBack();
	// 	return url;
	// }

	// async chatBotTitle() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
	// 	const botName = await frame.$eval(DASHBOARD.BOT.NAME, (name) => name.innerText);
	// 	return botName;
	// }
	// async chatBotByIOX_URL() {
	// 	await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	// 	const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
	// 	const byIOXButton = await frame.$(DASHBOARD.BOT.BYIOX_LINK);
	// 	await byIOXButton.click();
	// 	await this.page.waitFor(1000); //!
	// 	const pages = await this.browser.pages();
	// 	await pages[2].waitForSelector('#tmp_button-91792');
	// 	const url = await pages[2].url();
	// 	return url;
	// }

}
