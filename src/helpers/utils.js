//import * as path from 'path';
import { BOT_SECTION } from '../helpers/constants/botsSectionConstants.js';
import { NAVBAR } from '../helpers/constants/navbarConstants.js';
import { By } from 'selenium-webdriver';

export default class Utils {
	constructor (driver) {
		this.driver = driver;
	}

//     async getCorrespondingBotNumber (botName) {
// 		let i;
//         const botsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, bots => bots.length);
// 		for (i = 1; i < botsCount - 1; i++) {
// 			if ((await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`)) !== null) {
// 				let row = `body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`;
// 				let anyNextLocation = await this.page.$eval(row, (element) => element.innerText);
// 				if (anyNextLocation === botName) {
// 					break;
// 				}
// 			} else {
// 				i = 0;
// 				break;
// 			}
// 		}
// 		return await i;
//     }

//     async deleteBot (botName) {
//         await this.page.waitFor(500);
// 		await this.page.click(NAVBAR.SELECTORS.BOTS);
//         const botNumber = await this.getCorrespondingBotNumber(botName);
//         console.log('number: ', botNumber); //! remove
//         await this.page.waitFor(500);
//         await this.compareScreenshots('flowBot','deletedBotNumber'); //! remove
// 		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
//         await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
// 		return await true;
//     }

    async clickOnCreateBotButton () {
        await this.driver.sleep(500);
        const botsCount = await this.driver.findElements(By.css(BOT_SECTION.SELECTORS.ALL_BOTS)).then(bots => bots.length);
        //console.log('botsCount: ',botsCount -1);
        await this.driver.findElement(By.css(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`)).click();
        return await true;
    }
}