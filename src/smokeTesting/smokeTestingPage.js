import { SIDEMENU } from '../sideMenu/sideMenuConstants';
import { BOT_SECTION } from '../botSection/botsSectionConstants';
import Utils from '../helpers/utils';
import { By, until } from 'selenium-webdriver';

export default class FlowBot {
	constructor (driver) {
		this.driver = driver;
		this.utils = new Utils(driver);
	}

	async createBotByImportantActionDoc () {
		await this.driver.wait(until.elementLocated(By.css(SIDEMENU.SELECTORS.BOTS)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(SIDEMENU.SELECTORS.BOTS)).click();
		await this.utils.clickOnCreateBotButton();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT)).click();
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.BOT_NAME_INPUT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.BOT_NAME_INPUT)).sendKeys('test');
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME)).click();

		// //* Free text
		await this.driver.sleep(1000);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT)).clear();
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT)).sendKeys('What is your name?');
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ADD_ON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ADD_ON)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE)).sendKeys('Freetext Feedback');
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)).click();

		// //* Options
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		// await this.page.waitFor(500);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Would you like to continue?');
		// await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4);
		// await this.page.waitFor(500);
		// await this.page.type(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'Yes');
		// await this.page.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4);
		// await this.page.waitFor(500);
		// await this.page.type(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'No');
		// await this.page.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);

		//* Multiple options
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT)).sendKeys('You are a man or woman?');
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ADD_ON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ADD_ON)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE)).sendKeys('Multiple Options');
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)).click();
		await this.driver.sleep(1000);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4)).click();
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT)).sendKeys('Man');
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)).click();
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4)).click();
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT)).sendKeys('Woman');
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)).click();

		// //? new question for boy
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.QUESTION_ON_ANSWER_BOY);
		// await this.page.waitFor(500);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'How old are you?');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		// await this.page.waitFor(500);
		// await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Freetext Feedback');
		// await this.page.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);

		// //* DataPicker
		await this.driver.sleep(1500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT)).sendKeys('When is your birthday?');
		await this.driver.sleep(500);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.ADD_ON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.ADD_ON)).click();
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE)).sendKeys('Datepicker');
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)).click();
		await this.driver.sleep(1000);

		// //* Location
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		// await this.page.waitFor(500);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		// await this.page.waitFor(500);
		// await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
		// await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// //! new question for girl
		await this.driver.sleep(1000);
		await this.driver.wait(until.elementLocated(By.css('body > app-root > div > iox-page-container > div > iox-create > div > iox-conversation-tree > div > div.conversation-page > div > tree > tree-internal > ul > li > tree-internal:nth-child(4) > ul > li > tree-internal:nth-child(3) > ul > li > div > div.node-value.ng-star-inserted > div > div > button.btn.btn-primary.btn-xs.pull-right > span'),10000,'Could not locate the child element within the time specified'));
		await this.driver.findElement(By.css('body > app-root > div > iox-page-container > div > iox-create > div > iox-conversation-tree > div > div.conversation-page > div > tree > tree-internal > ul > li > tree-internal:nth-child(4) > ul > li > tree-internal:nth-child(3) > ul > li > div > div.node-value.ng-star-inserted > div > div > button.btn.btn-primary.btn-xs.pull-right > span')).click();
		await this.driver.sleep(1000);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.FILL_WITH_EXISTING_QUESTION)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.FILL_WITH_EXISTING_QUESTION)).sendKeys('Where are you from?');
		await this.driver.sleep(1000);
		await this.driver.wait(until.elementLocated(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)), 10000, 'Could not locate the child element within the time specified');
		await this.driver.findElement(By.css(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON)).click();
		await this.driver.sleep(1000);

		// await this.driver.takeScreenshot().then(function (data) {
		// 	fs.writeFileSync('out1.png', data, 'base64');
		// });

		// //* URL
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'This is the form for your profile:');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		// await this.page.waitFor(500);
		// await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'URL Generator');
		// await this.page.type(BOT_SECTION.SELECTORS.URL_INPUT_FOR_MAIN_URL, 'https://google.com');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_NEW_URL_PARAMETER);
		// await this.page.type(BOT_SECTION.SELECTORS.URL_INPUT_FOR_PATH_PARAMETER1, 'freetext_option_1');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_NEW_URL_PARAMETER);
		// await this.page.click(BOT_SECTION.SELECTORS.URL_CHECK_QUERY);
		// await this.page.type(BOT_SECTION.SELECTORS.URL_INPUT_FOR_PATH_PARAMETER2, 'datepicker_option_1');
		// await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// //* Slider custom
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Please choose your IQ level from 1 to 100');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		// await this.page.waitFor(500);
		// await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Slider');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT, '100');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT, '0');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT, '10');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT, '50');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_CHECKER);
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_1, '1');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_1, '20');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_1, 'too stupped');
		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_1);
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_2, '21');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_2, '40');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_2, 'stupped');
		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_2);
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_3, '41');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_3, '60');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_3, 'normal');
		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_3);
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_4, '61');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_4, '80');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_4, 'clever');
		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_4);
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_5, '81');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_5, '100');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_5, 'super clever');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_DEFAULT_VALUE, '50');
		// await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// //* Slider
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Please mark the bot from 1 to 10');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		// await this.page.waitFor(500);
		// await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Slider');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT, '10');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT, '1');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT, '1');

		// await this.page.click(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT);
		// await this.page.keyboard.down('Backspace');
		// await this.page.keyboard.down('Backspace');
		// await this.page.type(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT, '5');
		// await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// //* Search
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'This is the result of our demo bot');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		// await this.page.waitFor(500);
		// await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Search');
		// await this.page.waitFor(1500);
		// const input = await this.page.$(BOT_SECTION.SELECTORS.SEARCH_UPLOAD_FILE);
		// await input.uploadFile('./ioxTest.xlsx');

		// await this.utils.compareScreenshots('flowBot', 'bot4');
		// await this.page.waitFor(1500);
		// await this.page.click(BOT_SECTION.SELECTORS.SEARCH_ADD_BUTTON);
		// await this.utils.compareScreenshots('flowBot', 'bot5');
		// await this.page.waitFor(1500);
		// await this.page.type(BOT_SECTION.SELECTORS.SEARCH_SELECT_PARAMETER_INPUT, 'freetext_option_1');
		// await this.page.type(BOT_SECTION.SELECTORS.SEARCH_SELECT_COLUMN_INPUT, 'NAME');
		// await this.page.type(BOT_SECTION.SELECTORS.SEARCH_RESULT_MESSAGE_INPUT, 'This is your selected name: $NAME');

		//await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		//! Train Bot
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.RUN);
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.TRAIN);
		// await this.page.waitFor(600000); // 10 minutes

		//await this.utils.deleteBot('testBot');

		return await true;
	}
}
