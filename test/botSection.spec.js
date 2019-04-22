import { expect } from 'chai';
import BotSection from '../src/botsSection/botsSectionPage';
import { DASHBOARD } from '../src/dashboardSection/dashboardConstants';
import Utils from '../src/helpers/utils';
import { Builder } from 'selenium-webdriver';
import LoginPage from '../src/loginSection/loginSectionPage';
import chromeOptions from '../settings/chromeOptions';
import args from 'minimist';
import * as testRailCreds from '../settings/testRailSettings';
//import TestRailAPI from 'api-testrail';
import TestRailAPI from '../src/helpers/index';

let driver, loginPage, botSection, utils;
let testRailApi, runID, caseID;
const argumentS = args(process.argv.slice(2));
const runWithTestRail = argumentS._[1] === 'TestRail' ? true : false;
const argument2 = argumentS._[2];

describe('Bot section', () => {
	before(async () => {
		driver = new Builder().forBrowser('chrome')
		.setChromeOptions(chromeOptions).build();
		loginPage = new LoginPage(driver);
		await loginPage.open();
		await loginPage.logIn();
		testRailApi = new TestRailAPI(testRailCreds.host,testRailCreds.username, testRailCreds.password);
		utils = new Utils(driver);
		botSection = new BotSection(driver);
		// set runID provided argument2 (if exist) or create new run
		runID = await utils.addRunWithType(argument2,testRailApi,1,3);
	});
	after(async () => {
		await driver.quit();
	});
	// beforeEach(async () => {
	// 	await utils.reload();
	// });
	afterEach(async () => {
		if (runWithTestRail) {
			if (await testRailApi.getResultForCase(runID,caseID) !== 1) {
				await testRailApi.addResultForCase(runID,caseID,5);
			}
		}
	});

	context.only('Test Rail APi testing', () => {
		it('Simple tests', async () => {
			//console.log(await testRailApi.deleteSection(14));
			console.log(await testRailApi.getTests(696,5));
		});
	});
	context.skip('Open Dashboard page', () => {
		it('C32  284 - Check the Dashboard page opens after Login', async function () {
			// get test ID
			caseID = this.test.title.substr(1,3).trim();
			// run tests
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
			// update TestRail if corresponding argument(TestRail) is provided
			await utils.addResultForCase(testRailApi, runID, caseID);
		});
	});
	context.skip('Open Dashboard page', () => {
		it('C34 284 - Check the Dashboard page opens after Login', async function () {
			// get test ID
			caseID = this.test.title.substr(1,3).trim();
			// run tests
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
			// update TestRail if corresponding argument(TestRail) is provided
			await utils.addResultForCase(testRailApi, runID, caseID);
		});
		it('C35 284 - Check the Dashboard page opens after Login', async function () {
			// get test ID
			caseID = this.test.title.substr(1,3).trim();
			// run tests
			expect(await botSection.getDefaultSectionTitle()).to.equal('kDashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
			// update TestRail if corresponding argument(TestRail) is provided
			await utils.addResultForCase(testRailApi, runID, caseID);
		});
	});

	context('Create Flow Bot', () => {
		it('C54 282 - Check that when user creates more than 10 bots the website works as it was', async () => {
			// get Bots count before test
			const botsCountBefore = await botSection.getBotsCountFromDashboard(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT);
			// create 10 bots
			await botSection.createFlowBots('testBotForC282', 10);
			// get Bots count after create 10 Bots
			const botsCountAfter = await botSection.getBotsCountFromDashboard(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT);
			// delete created 10 unnecessory bot
			await botSection.deleteFlowBots('testBotForC282', 10);
			// check that we created just 10 new bots
			expect(await Number(botsCountAfter)).to.equal(Number(botsCountBefore) + 10);
		});
		it('C55 69 - Check the "Create Bot" functionality', async () => {
			// create 3 bots
			await botSection.createBotsWithLocationQuestion('C69', 3);
			// get and check that we have 3 bots with name 'C69'
			const botsCount = await botSection.getBotCount('C69');
			expect(await Number(botsCount)).to.equal(3);
			// delete created 3 unnecessory bot
			await botSection.deleteFlowBots('C69', 3);
			// get and check that we delete created 3 bots
			const botsCountAfterDeleting = await botSection.getBotCount('C69');
			expect(await Number(botsCountAfterDeleting)).to.equal(0);
		});
	});

	context('Delete Bots', () => {
		it('C48 6163 - Check the "Delete Flow Bot" (not trained) functionality', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6163');
			expect(await botSection.botIsExist('C6163')).to.equal(true, 'C6163 Bot is not exist, create process failed');
			// click on No button on delete FlowBot Modal and check that bot is not deleted
			await botSection.clickOnNoButtonOnDeleteModal('C6163');
			expect(await botSection.botIsExist('C6163')).to.equal(true, 'C6163 Bot is not exist');
			// delete bot and check that bot is deleted
			await botSection.deleteBot('C6163');
			expect(await botSection.botIsExist('C6163')).to.equal(false, 'C6163 bot did not delete');
		});
		it('C49 6164 - Check the `Delete Flow Bot` (trained) functionality', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6164');
			expect(await botSection.botIsExist('C6164')).to.equal(true, 'C6164 Bot is not exist, create process failed');
			// train bot and check that bot is trained
			await botSection.trainBot('C6164');
			expect(await botSection.botIsTrained('C6164')).to.equal(true, 'C6164 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// chack that delete button is disabled
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6164')).to.equal(true, 'C6164, delete button is not disabled');
			// write wrong word in delete input and check that delete button still disabled
			await botSection.writeWrongWordInBotDeleteInput('del');
			expect(await botSection.checkDeleteButtonIsDisableOrNoAfterWrongWord()).to.equal(true, 'C6164, delete button is not disabled after writing wrong word ');
			// click on cancel button
			await botSection.clickOnCancelButtonOnTrainedBotDeleteModal();
			// check that bot is still exist
			expect(await botSection.botIsExist('C6164')).to.equal(true);
			// delete bot and check that bot deleted
			await botSection.deleteTrainedBot('C6164');
			expect(await botSection.botIsExist('C6164')).to.equal(false, 'C6164 bot did not delete');
		});
		it('C50 6165 - Check the "Delete NLP Bot" (not trained) functionality', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6165');
			expect(await botSection.botIsExist('C6165')).to.equal(true, 'C6165 Bot is not exist, create process failed');
			// click on No button on delete FlowBot Modal and check that bot is not deleted
			await botSection.clickOnNoButtonOnDeleteModal('C6165');
			expect(await botSection.botIsExist('C6165')).to.equal(true, 'C6165 Bot is not exist');
			// delete bot and check that bot deleted
			await botSection.deleteBot('C6165');
			expect(await botSection.botIsExist('C6165')).to.equal(false, 'C6165 bot did not delete');
		});
		it('C51 6166 - Check the `Delete NLP Bot` (trained) functionality', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6166');
			expect(await botSection.botIsExist('C6166')).to.equal(true, 'C6166 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await botSection.integrateBotToGoogle('C6166');
			// train bot and check that bot is trained
			await botSection.trainBot('C6166');
			expect(await botSection.botIsTrained('C6166')).to.equal(true, 'C6166 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// check that delete button is disabled
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6166')).to.equal(true, 'C6166, delete button is not disabled');
			// write wrong word in delete input and check that delete button still disabled
			await botSection.writeWrongWordInBotDeleteInput('del');
			expect(await botSection.checkDeleteButtonIsDisableOrNoAfterWrongWord()).to.equal(true, 'C6166, delete button is not disabled after writing wrong word ');
			// click on cancel button
			await botSection.clickOnCancelButtonOnTrainedBotDeleteModal();
			// check that bot is still exist
			expect(await botSection.botIsExist('C6166')).to.equal(true);
			// delete bot and check that bot deleted
			await botSection.deleteTrainedBot('C6166');
			expect(await botSection.botIsExist('C6166')).to.equal(false, 'C6166 bot did not delete');
		});
	});

	context('Get toaster about deleting Bots', () => {
		it('C24 6167 - Check that we get toaster about deleting not trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6167');
			expect(await botSection.botIsExist('C6167')).to.equal(true, 'C6167 Bot is not exist, create process failed');
			// delete bot and check that bot deleted
			await botSection.deleteBot('C6167');
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C25 6168 - Check that we get toaster about deleting trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6168');
			expect(await botSection.botIsExist('C6168')).to.equal(true, 'C6168 Bot is not exist, create process failed');
			// train bot and that bot is trained
			await botSection.trainBot('C6168');
			expect(await botSection.botIsTrained('C6168')).to.equal(true, 'C6168 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot
			await botSection.deleteTrainedBot('C6168');
			// check that we get the notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C26 6169 - Check that we get toaster about deleting not trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6169');
			expect(await botSection.botIsExist('C6169')).to.equal(true, 'C6169 Bot is not exist, create process failed');
			// delete bot
			await botSection.deleteBot('C6169');
			// check that we get notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C27 6170 - Check that we get toaster about deleting trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6170');
			expect(await botSection.botIsExist('C6170')).to.equal(true, 'C6170 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await botSection.integrateBotToGoogle('C6170');
			// train bot and check that bot is trained
			await botSection.trainBot('C6170');
			expect(await botSection.botIsTrained('C6170')).to.equal(true, 'C6170 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot
			await botSection.deleteTrainedBot('C6170');
			// check that we get the notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
	});

	context('Get text from alert and check', () => {
		it('C28 6171 - Check that we get correct text from alert when delete not trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6171');
			expect(await botSection.botIsExist('C6171')).to.equal(true, 'C6171 Bot is not exist, create process failed');
			// delete bot and get text from alert
			expect(await botSection.deleteNotTrainedBotAndGetTextFromAlert('C6171')).to.equal('Are you sure that you want to delete this bot?');
		});
		it('C29 6172 - Check that we get correct text from alert when delete trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6172');
			expect(await botSection.botIsExist('C6172')).to.equal(true, 'C6172 Bot is not exist, create process failed');
			// train bot and that bot is trained
			await botSection.trainBot('C6172');
			expect(await botSection.botIsTrained('C6172')).to.equal(true, 'C6172 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot and get text from alert
			expect(await botSection.deleteTrainedBotAndGetTextFromAlert('C6172')).to.equal('This bot is deployed. If you delete it the deployed version will be deleted as well. Please type \'delete\' word if you really want to delete the bot.');
		});
		it('C30 6173 - Check that we get correct text from alert when delete not trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6173');
			expect(await botSection.botIsExist('C6173')).to.equal(true, 'C6173 Bot is not exist, create process failed');
			// delete bot and get text from alert
			expect(await botSection.deleteNotTrainedBotAndGetTextFromAlert('C6173')).to.equal('Are you sure that you want to delete this bot?');
		});
		it('C31 6174 - Check that we get correct text from alert when delete trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6174');
			expect(await botSection.botIsExist('C6174')).to.equal(true, 'C6174 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await botSection.integrateBotToGoogle('C6174');
			// train bot and check that bot is trained
			await botSection.trainBot('C6174');
			expect(await botSection.botIsTrained('C6174')).to.equal(true, 'C6174 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot and get text from alert
			expect(await botSection.deleteTrainedBotAndGetTextFromAlert('C6174')).to.equal('This bot is deployed. If you delete it the deployed version will be deleted as well. Please type \'delete\' word if you really want to delete the bot.');
		});
	});

	context('Update Flow Bot', () => {
		it('C52 73 - Check "the Edit Bot" functionality', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C73');
			expect(await botSection.botIsExist('C73')).to.equal(true, 'C73 Bot is not exist, create process failed');
			// update Initial Question To FreeText Question
			await botSection.updateInitialQuestionToFreeTextQuestion('C73');
			// get text from question field and check
			expect(await botSection.getTextFromFirstQuestion('C73')).to.include('What is your name?');
		});
	});

	context('Delete integrated bot (Magento, Wordpress)', () => {
		it('C344 - Check the "Delete Bot" with Integration functionality', async () => {
			// get code from puppeteer_ts
		});
		it('CXXX - Check the "Delete NLP Bot" with Integration functionality', async () => {
			// get code from puppeteer_ts
		});
	});
});