import { BOT_SECTION } from '../botsSection/botsSectionConstants';
import { By, until } from 'selenium-webdriver';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';
import { IFRAME } from '../botsSection/iframeConstants';

export default class Utils {
	constructor (driver) {
		this.driver = driver;
    }
    async click(selector) {
        await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
        await this.driver.findElement(By.css(selector)).click();
    }
    // async click(selector) {
	// 	//console.log('click on ', selector);
	// 	try {
	// 		await this.page.waitForSelector(selector);
	// 	} catch (err) {
	// 		if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
	// 		throw new Error(`Error. WaitFor: ' ${selector}`)
	// 		} else {
	// 			throw err
	// 		}
	// 	}
	// 	await this.page.click(selector);
    // }
    async sendKeys(selector, text) {
        await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
        await this.driver.findElement(By.css(selector)).sendKeys(text);
    }
    async clear(selector) {
        await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
        await this.driver.findElement(By.css(selector)).clear();
    }

    async getElementsLength(selector) {
        const length = await this.driver.findElements(By.css(selector)).then(bots => bots.length);
        return await length;
	}

	async goToDashboardPage() {
		await this.click(SIDEMENU.SELECTORS.DASHBOARD);
	}
	async goToBotsPage() {
		await this.click(SIDEMENU.SELECTORS.BOTS);
	}

    async getCorrespondingBotNumber(botName) {
		await this.driver.sleep(1000);
        let i;
        const bots = await this.driver.findElements(By.css(BOT_SECTION.SELECTORS.ALL_BOTS));
		const botsCount = bots.length;
		for (i = 1; i < botsCount; i++) {
            const row = await this.driver.findElement(By.css(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`));
            const anyNextLocation = await row.getText();
            if (anyNextLocation === botName) {
                break;
			}
		}
		if (i === botsCount) {
			return false;
		} else {
			return i;
		}
	}

	async reload() {
		await this.driver.navigate().refresh();
		await this.driver.sleep(500);
	}

	async getText(selector) {
		let element = await this.driver.findElement(By.css(selector));
		let text = await element.getText();
		return await text;
	}


	async acceptChatBotAgreement() {
		const botUrl = await this.getBotUrl('clickOnGoogle');
		await this.page.goto(botUrl);
		await this.click(IFRAME.SELECTORS.MAIN_BUTTON);
		await this.click(IFRAME.SELECTORS.AGREEMENT_CHECKBOX);
		await this.click(IFRAME.SELECTORS.AGREEMENT_CONFIRM_BUTTON);
		await this.page.goBack();
		return true;
	}

	async getBotUrl(botName) {
		await this.click(SIDEMENU.SELECTORS.BOTS);
		const botNumber = await this.getCorrespondingBotNumber(botName);
		const linkOfBot = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.copy-area-container > div > div > a`);
		const botHref = await linkOfBot.getProperty('href');
		const botUrlHome = botHref._remoteObject.value;
		const botUrlChat = botUrlHome.replace('home', 'chat');
		return botUrlChat;
	}

	async waitUntilElementIsNotVisible(selector, errorText='') {
		const progressBar = await this.driver.findElement(By.css(selector));
		await this.driver.wait(until.elementIsNotVisible(progressBar), 300000, errorText);
	}

}
