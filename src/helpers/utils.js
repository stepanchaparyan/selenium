import { BOT_SECTION } from '../botSection/botsSectionConstants';
import { By, until } from 'selenium-webdriver';
import { SIDEMENU } from '../sideMenu/sideMenuConstants';

export default class Utils {
	constructor (driver) {
		this.driver = driver;
    }
    
    async click(selector) {
        await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(selector)).click();
    }
    async sendKeys(selector, text) {
        await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(selector)).sendKeys(text);
    }
    async clear(selector) {
        await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(selector)).clear();
    }

    async clickOnCreateBotButton () {
        await this.driver.sleep(500);
        await this.driver.navigate().refresh();
        const botsCount = await this.getElementsLength(BOT_SECTION.SELECTORS.ALL_BOTS);
        await this.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`);
        return await true;
    }

    async getElementsLength(selector) {
        const length = await this.driver.findElements(By.css(selector)).then(bots => bots.length);
        return await length;
    }

    async createFlowBot(botName) {
		await this.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, botName);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(1000); //!
	}



}