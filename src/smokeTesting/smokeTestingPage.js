import { SIDEMENU } from '../sideMenu/sideMenuConstants';
import { BOT_SECTION } from '../botSection/botsSectionConstants';
import Utils from '../helpers/utils';
import { By, until } from 'selenium-webdriver';

export default class FlowBot {
	constructor (driver) {
		this.driver = driver;
		this.utils = new Utils(driver);
	}

	async createFlowBot() {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'selSmoke');
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
	}

	async createFreeTextQuestion () {
		await this.driver.sleep(1000);
		await this.utils.click(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION);
		await this.utils.clear(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'What is your name?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Freetext Feedback');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async createOptionsQuestion() {
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Would you like to continue?');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4);
		await this.driver.sleep(500);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'Yes');
		await this.utils.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4);
		await this.driver.sleep(500);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'No');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async createMultipleOptionQuestion() {
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'You are a man or woman?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Multiple Options');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q5);
		await this.driver.sleep(500);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'Man');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q5);
		await this.driver.sleep(500);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'Woman');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async createNestedFreeTextQuestion() {
		//? new question for boy
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_ON_ANSWER_BOY);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'How old are you?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Freetext Feedback');
		await this.utils.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);
	}

	async createDatepickerQuestion() {
		await this.driver.sleep(1000);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'When is your birthday?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Datepicker');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async createLocationQuestion() {
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async createReferenceLocationQuestion() {
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_ON_ANSWER_GIRL);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.FILL_WITH_EXISTING_QUESTION, 'Where are you from?');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async createURLQuestion() {
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'This is the form for your profile:');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'URL Generator');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.URL_INPUT_FOR_MAIN_URL, 'https://google.com');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_NEW_URL_PARAMETER);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.URL_INPUT_FOR_PATH_PARAMETER1, 'freetext_option_1');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_NEW_URL_PARAMETER);
		await this.utils.click(BOT_SECTION.SELECTORS.URL_CHECK_QUERY);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.URL_INPUT_FOR_PATH_PARAMETER2, 'datepicker_option_1');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async sliderQuestion() {
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Please mark the bot from 1 to 10');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Slider');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT, '10');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT, '1');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT, '1');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT, '5');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
	}

	async customSliderQuestion() {
		await this.driver.sleep(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Please choose your IQ level from 1 to 100');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Slider');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT, '100');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT, '0');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT, '10');
		await this.utils.clear(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT, '50');

		await this.utils.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_CHECKER);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_1, '1');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_1, '20');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_1, 'too stupped');
		await this.utils.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_1);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_2, '21');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_2, '40');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_2, 'stupped');
		await this.utils.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_2);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_3, '41');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_3, '60');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_3, 'normal');
		await this.utils.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_3);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_4, '61');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_4, '80');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_4, 'clever');
		await this.utils.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_4);
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_5, '81');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_5, '100');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_5, 'super clever');
		await this.utils.sendKeys(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_DEFAULT_VALUE, '50');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		//! 
		await this.driver.sleep(1000);
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	}

	async createBotByImportantActionDoc () {

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
