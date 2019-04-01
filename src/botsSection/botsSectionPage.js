import { BOT_SECTION } from './botsSectionConstants';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';
import Utils from '../helpers/utils';
import LoginPage from '../loginSection/loginSectionPage';
import { By, until } from 'selenium-webdriver';

export default class BotSection {
	constructor(driver) {
		this.driver = driver;
		this.utils = new Utils(driver);
		this.loginPage = new LoginPage(driver);
	}

    async createFlowBot(botName) {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
        await this.clickOnCreateBotButton();
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, botName);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.driver.sleep(1000); //!
	}
	async createFlowBots(botName, count = 1) {
		for (let i = 0; i < count; i++) {
			await this.createFlowBot(botName);
		}
	}
	async createNLPBot(botName) {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnCreateBotButton();
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, botName);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.driver.sleep(1000); //!
	}

	async deleteBot(botName) {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.driver.sleep(500);//
		await this.utils.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.driver.sleep(500);
	}
	async deleteFlowBots(botName, count = 1) {
		for (let i = 0; i < count; i++) {
			await this.deleteBot(botName);
			await this.utils.reload();
		}
	}
	async deleteTrainedBot(botName) {
		await this.driver.sleep(2000);//!
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'delete');
		await this.driver.sleep(1000);//!
		await this.utils.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.driver.sleep(1000);//!
	}

	async trainBot(botName) {
		await this.clickOnBotUpdateButton(botName);
		await this.driver.sleep(1000); //!
		await this.utils.click(BOT_SECTION.SELECTORS.RUN);
		await this.utils.click(BOT_SECTION.SELECTORS.TRAIN);
		await this.utils.waitUntilElementIsNotVisible(BOT_SECTION.SELECTORS.PROGRESS_BAR, 'Train process does not finish');
	}
	async integrateBotToGoogle(botName) {
		await this.clickOnBotUpdateButton(botName);
		await this.utils.click(BOT_SECTION.SELECTORS.INTEGRATE);
		await this.utils.click(BOT_SECTION.SELECTORS.CHECHBOX_GOOGLE_HOME);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_1, 'newagent-4dfa0');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_2, '237d84ca4fc8457c8b3cf8c4c348476b');
		await this.utils.click(BOT_SECTION.SELECTORS.INTEGRATE_BUTTON);
		await this.driver.sleep(2000); //! 2000
		await this.utils.goToBotsPage();
	}

	async botIsExist(botName) {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.reload();
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		let botIsExist = false;
		if (botNumber !== false) {
			botIsExist = true;
		}
		return botIsExist;
	}
	async botIsTrained(botName) {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		const checkbox = await this.driver.findElement(By.css(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.status-bar > i`));
		const className = await checkbox.getAttribute('class');
		const classNameIncludescheck = String(className).includes('check');
		return classNameIncludescheck;
	}

    async clickOnCreateBotButton () {
        await this.driver.sleep(500);
        await this.driver.navigate().refresh();
        const botsCount = await this.utils.getElementsLength(BOT_SECTION.SELECTORS.ALL_BOTS);
        await this.utils.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`);
        return await true;
	}
	async clickOnBotDeleteButton(botName) {
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		await this.driver.wait(until.elementLocated(By.css(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`)), 10000, 'Could not locate the child element within the time specified');
		await this.utils.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
	}
	async clickOnBotUpdateButton(botName) {
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		await this.utils.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(1)`);
	}
	async clickOnCancelButtonOnTrainedBotDeleteModal(){
		await this.driver.sleep(1000);//! 0
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		await this.driver.sleep(1000);//! 0
	}
	async clickOnNoButtonOnDeleteModal(botName) {
		await this.utils.goToBotsPage();
		await this.clickOnBotDeleteButton(botName);
		await this.utils.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		await this.driver.sleep(500);
	}

	async deleteNotTrainedBotAndGetTextFromAlert(botName) {
		await this.driver.sleep(1000);//!
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.driver.sleep(1000); //!
		const text = await this.utils.getText(BOT_SECTION.SELECTORS.DELETE_ALERT_TEXT);
		await this.utils.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.driver.sleep(1000); //?
		return await text;
	}
	async deleteTrainedBotAndGetTextFromAlert(botName) {
		await this.driver.sleep(2000);//!
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.driver.sleep(1000); //!
		const text = await this.utils.getText(BOT_SECTION.SELECTORS.DELETE_ALERT_TEXT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'delete');
		await this.utils.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON, { delay: 50 });
		await this.driver.sleep(1000);//!
		return await text;
	}

	async createLocationQuestion() {
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.driver.sleep(500);//
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		const element = await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON));
		await this.driver.wait(until.elementIsNotVisible(element));
		await this.driver.sleep(500);//
	}

	async createBotsWithLocationQuestion(botName, count = 1) {
		for (let i = 0; i < count; i++) {
			await this.createFlowBot(botName);
			await this.createLocationQuestion();
		}
	}

	async getBotCount(botName) {
		await this.utils.reload();
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.BOTS)).click();
		await this.driver.sleep(1000);
		const allBotsCount = await this.utils.getElementsLength(BOT_SECTION.SELECTORS.ALL_BOTS);
		let botCount = 0;
		for (let i = 1; i < allBotsCount; i++) {
			if (await this.utils.getText(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`) === botName) {
				botCount++;
			}
		}
		return botCount;
	}

	async getBotsCountFromDashboard(selector) {
		await this.utils.goToDashboardPage();
        await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
		let botsCountText = await this.utils.getText(selector);
		const botsCountBefore = botsCountText.substr(0, 2);
		return await botsCountBefore;
	}

	async updateInitialQuestionToFreeTextQuestion(botName) {
		await this.driver.sleep(500);
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotUpdateButton(botName);
		await this.utils.click(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION);
		await this.utils.click(BOT_SECTION.SELECTORS.REMOVE_DEFAULT_QUESTION);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'What is your name?');
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.driver.sleep(500);
	}
	async getTextFromFirstQuestion(botName) {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotUpdateButton(botName);
		const text = await this.utils.getText(BOT_SECTION.SELECTORS.FIRST_QUESTION);
		await this.deleteBot(botName);
		return await text;
	}

	async checkButtonIsDisabledOrNo(selector) {
		const buttonIsDisabled = await this.driver.findElement(By.css(selector)) !== null;
		return buttonIsDisabled;
	}
	async checkDeleteButtonIsDisableOrNo(botname) {
		await this.utils.goToBotsPage();
		await this.clickOnBotDeleteButton(botname);
		const buttonIsDisabled = await this.checkButtonIsDisabledOrNo(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON);
		return buttonIsDisabled;
	}
	async writeWrongWordInBotDeleteInput(wrongWord) {
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, wrongWord);
	}
	async checkDeleteButtonIsDisableOrNoAfterWrongWord() {
		const buttonIsDisabled = await this.checkButtonIsDisabledOrNo(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON);
		return buttonIsDisabled;
	}

	async getDefaultSectionTitle() {
		await this.utils.reload();
		await this.loginPage.logOut();
		await this.loginPage.logIn();
		await this.driver.sleep(500);
		return this.driver.getTitle();
	}
	async getDefaultSectionURL() {
		await this.utils.reload();
		const url = await this.driver.getCurrentUrl();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	async checkDashboardSectionIsActive() {
		const dashboardSection = await this.driver.findElement(By.css(SIDEMENU.SELECTORS.DASHBOARD));
		const className = await dashboardSection.getAttribute('class');
		const classNameIncludedActive = String(className).includes('active');
		return classNameIncludedActive;
	}
	async waitAndGetTextFromNotification() {
		// try {
			await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION)), 10000, 'Could not locate the child element within the time specified');
		// } catch (err) {
		// 	if (err === 'Error: waiting failed: timeout 30000ms exceeded') {
		// 	throw new Error('Notification did not appeared');
		// 	} else {
		// 		throw err;
		// 	}
		// }
		let element = await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION));
		let text = await element.getText();
		return text;
	}
	async goToIntegratePage() {
		await this.utils.click(BOT_SECTION.SELECTORS.INTEGRATE);
	}
	async clickOnMagentoCheckbox() {
		await this.page.waitFor(1000);
		await this.utils.click(BOT_SECTION.SELECTORS.CHECHBOX_MAGENTO);
	}
	async clickOnLinkOnAlert(){
		await this.page.waitFor(2000);
		await this.utils.click(BOT_SECTION.SELECTORS.API_CONNECTOR_SETTING_LINK_ON_ALERT);
		//await this.page.waitFor(2000);
	}
	async generateKeyAndReturn() {
		await this.utils.click(BOT_SECTION.SELECTORS.GENERATE_KEY_BUTTON);
		// wait until key generate
		await this.page.waitFor(5000);
		//await this.page.waitForFunction(`document.querySelector('body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(1) > div > span').innerText > 0;`);
		//GENERATED_PRIVATE_KEY_TEXT);
		await this.utils.click(BOT_SECTION.SELECTORS.X_BUTTON_ON_GENERATE_KEY_ALERT);
		await this.goToBotsPage();
	}

}