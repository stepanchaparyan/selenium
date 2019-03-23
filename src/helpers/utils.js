import { BOT_SECTION } from '../botSection/botsSectionConstants';
import { By } from 'selenium-webdriver';

export default class Utils {
	constructor (driver) {
		this.driver = driver;
	}

    async clickOnCreateBotButton () {
        await this.driver.sleep(500);
        const botsCount = await this.driver.findElements(By.css(BOT_SECTION.SELECTORS.ALL_BOTS)).then(bots => bots.length);
        //console.log('botsCount: ',botsCount -1);
        await this.driver.findElement(By.css(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`)).click();
        return await true;
    }
}