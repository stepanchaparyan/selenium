import chrome from 'selenium-webdriver/chrome';

let chromeOptions = new chrome.Options();
//options.addArguments('headless');
//options.addArguments('--start-maximized');
chromeOptions.addArguments('--window-size=900,900');
chromeOptions.addArguments('disable-infobars');

export default chromeOptions;
