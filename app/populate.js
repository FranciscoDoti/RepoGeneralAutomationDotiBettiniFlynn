const { getDriver, onWaitForElementToBeVisible, onPageLoadedWaitById, onWaitForElementToBeLocated, onWaitForWebElementToBeEnabled, onWaitForWebElementToBeDisabled, onWaitForElementToBeInvisible, sleep } = require('./driver');
const { By, Key } = require('selenium-webdriver');
const WebElement = require(`${process.cwd()}/app/WebElement`);
const { log } = require(`${process.cwd()}/app/logger`);
const { assert } = require('chai');

const populateInput = async function (selector, value, WebElementObject) {
  const type = await selector.getAttribute('type');
  switch (type) {
    case 'radio':
      if (value.toLowerCase() === 'click') {
        log.debug('Clicking radio button');
        await selector.click();
      } else {
        log.debug('By passing radio button click');
      }
      break;
    
    case 'file':
      await populateFile(selector, value, WebElementObject);
      break;

    case 'email':
    case 'text':
    case 'textarea':
    case 'password':
    case 'number':
      await populateTextField(selector, value, WebElementObject);
      break;

    case 'checkbox':
      if (value.toLowerCase() === 'click') {
        await populateClick(selector, value, WebElementObject);
      } else {
        log.debug('Bypassing the checkbox click');
      }
      break;

    case 'button':
    case 'submit':
      if (value.toLowerCase() === 'click') {
        await populateClick(selector, value, WebElementObject);
      } else {
        log.debug('Bypassing the button click');
      }
      break;


    default:
    assert.fail(`ERROR: populateInput() failed because the input type ${type} has not been coded for.`);
  }
};

const populateSelect = async function (selector, item, WebElementData) {
  const localSpecialInstr = WebElementData.specialInstr || '';

  if(localSpecialInstr.toLowerCase().includes('focus'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Focussing on element.`);
    await WebElementObject.webElement.focus();
  }
  
  if (localSpecialInstr.toLowerCase().includes('selectbyvisibletext')) {
    await selector.selectByVisibleText(item);
  } else if (localSpecialInstr.toLowerCase().includes('selectbyvalue')) {
    await selector.selectByValue(item);
  } else {
    const options = await selector.findElements(By.tagName('option'));
    for await (let option of options) {
      const optionText = await option.getText();
      if (item === optionText) {
        await option.click();
        break;
      }
    };
  }
  if (localSpecialInstr.toLowerCase().includes('tabafter')) {
    log.debug('Hitting arrow down key');
    await selector.sendKeys(Key.TAB);
  }
  if (localSpecialInstr.toLowerCase().includes('enterafter')) {
    log.debug('Hitting return key');
    await selector.sendKeys(Key.RETURN);
  }
};

const populateTextField = async function (selector, value, WebElementObject) {
  const actions = getDriver().actions({bridge: true});

  let localSpecialInstr = '';
  const WebElementData = WebElementObject.element;
  const eleValue = await selector.getAttribute('value');
  if (WebElementData && WebElementData.specialInstr != null) {
    localSpecialInstr = WebElementData.specialInstr;
  }

  if(localSpecialInstr.toLowerCase().includes('focus'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Focussing on element.`);
    await WebElementObject.webElement.focus();
  }

  if(!localSpecialInstr.toLowerCase().includes('noclick'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Clicking on element.`);
    await selector.click();
  }

  if(!localSpecialInstr.toLowerCase().includes('noclear'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Clicking on element.`);
    await selector.clear();
  }

  if(localSpecialInstr.toLowerCase().includes('overwrite'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Current text is ${eleValue}. Overwriting text.`);
    await actions.click(selector).click(selector).click(selector).sendKeys('').perform();
  }

  if (value != ''){
    await selector.sendKeys(value);
    log.debug(`Post populate text field value: ${eleValue}`);
  }

  if (localSpecialInstr.toLowerCase().includes('tabafter')) {
    log.debug('Hitting tab key');
    await selector.sendKeys(Key.chord(Key.TAB));
  }
  if (localSpecialInstr.toLowerCase().includes('arrowdownafter')) {
    log.debug('Hitting arrow down key');
    await selector.sendKeys(Key.DOWN);
  }
  if (localSpecialInstr.toLowerCase().includes('enterafter')) {
    log.debug('Hitting return key');
    await selector.sendKeys(Key.RETURN);
  }

  if (localSpecialInstr.toLowerCase().includes('waitafter2secs')) {
    try {
      log.debug(`Sleeping 2 seconds. Special Instruction is : ${localSpecialInstr}`);
      await sleep(3000);
    } catch (e) {
      log.error(e);
    }
  }
};

const populateClick = async function (selector, value, WebElementObject) {
  const WebElementData = WebElementObject.element;
  let localSpecialInstr = '';
  if (WebElementData && WebElementData.specialInstr != null) {
    localSpecialInstr = WebElementData.specialInstr;
  }

  if(localSpecialInstr.toLowerCase().includes('focus'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Focussing on element.`);
    await WebElementObject.webElement.focus();
  }

  if (value.toLowerCase() === 'click') {
    if (WebElementData && WebElementData.waitForElementToBeEnabled) {
      log.debug('Waiting until element to be enabled');
      const webElementTarget = await WebElement(WebElementData);
      const webElement = await webElementTarget.getWebElement();
      await onWaitForWebElementToBeEnabled(webElement);
      await sleep(500);
    }

    await selector.click();
    await sleep(500);

    if (WebElementData && WebElementData.waitIdToBeVisibleonNextPage) {
      log.debug('Waiting until page loads after click');
      await onPageLoadedWaitById(WebElementData.waitIdToBeVisibleonNextPage);
      await sleep(500);
    }

    if (WebElementData && WebElementData.waitToBeVisible) {
      log.debug(`Waiting until WebElementData (${WebElementData}) to be visible`);
      const webElementTarget = await WebElement(WebElementObject.waitToBeVisible);
      const webElement = await webElementTarget.getBy();
      await onWaitForElementToBeVisible(webElement);
      await sleep(500);
    }

    log.debug('Clicked web element');
  }

  if (WebElementObject && WebElementObject.elementToWaitToBeInvisible) {
    log.debug(`Waiting until WebElementObject (${WebElementObject}) to be invisible`);
    const webElementTarget = await WebElement(WebElementObject.elementToWaitToBeInvisible);
    const webElement = await webElementTarget.getBy();
    await onWaitForElementToBeInvisible(webElement);
    log.debug('Sleeping 1000ms');
    await sleep(500);
  }

  if (localSpecialInstr && localSpecialInstr.toLowerCase().indexOf('waitAfter2secs') > -1) {
    try {
      log.debug(`Sleeping 2 seconds: Click - waitAfter2secs ${localSpecialInstr.toLowerCase().indexOf('waitAfter2secs')}`);
      await sleep(2000);
      log.debug('Waking up.');
    } catch (e) {
      log.error(e);
    }
  }
};

const populateFile = async function (selector, value, WebElementObject) {
  let localSpecialInstr = '';
  const WebElementData = WebElementObject.element;
  if (WebElementData && WebElementData.specialInstr != null) {
    localSpecialInstr = WebElementData.specialInstr;
  }

  if(localSpecialInstr.toLowerCase().includes('focus'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Focussing on element.`);
    await WebElementObject.webElement.focus();
  }

  if (localSpecialInstr.toLowerCase().includes('makevisible')) {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Running javascript on page.`);
    await getDriver().executeScript("arguments[0].style.height='auto'; arguments[0].style.visibility='visible';", selector);
  }

  if (!localSpecialInstr.toLowerCase().includes('noclick')) {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Clicking on element.`);
    await selector.click();
  }

  if (localSpecialInstr.toLowerCase().includes('overwrite')) {
    //no use case yet
  } else if (!localSpecialInstr.toLowerCase().includes('noclear')) {
    //no use case yet
  }

  await selector.sendKeys(value);
  log.debug(`File at path '${value}' uploaded.`);

  if (localSpecialInstr.toLowerCase().includes('tabafter')) {
    log.debug('Hitting tab key');
    await selector.sendKeys(Key.chord(Key.TAB));
  }
  if (localSpecialInstr.toLowerCase().includes('arrowdownafter')) {
    log.debug('Hitting arrow down key');
    await selector.sendKeys(Key.DOWN);
  }
  if (localSpecialInstr.toLowerCase().includes('enterafter')) {
    log.debug('Hitting return key');
    await selector.sendKeys(Key.RETURN);
  }

  if (localSpecialInstr.toLowerCase().includes('waitafter2secs')) {
    try {
      log.debug(`Sleeping 2 seconds. Special Instruction is : ${localSpecialInstr}`);
      await sleep(3000);
    } catch (e) {
      log.error(e);
    }
  }
};

const populateRichTextField = async function (selector, value, WebElementObject) {
  const actions = getDriver().actions({bridge: true});

  let localSpecialInstr = '';
  const WebElementData = WebElementObject.element;
  const eleValue = await selector.getAttribute('textContent');
  if (WebElementData && WebElementData.specialInstr != null) {
    localSpecialInstr = WebElementData.specialInstr;
  }

  if(localSpecialInstr.toLowerCase().includes('focus'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Focussing on element.`);
    await WebElementObject.webElement.focus();
  }

  if (!localSpecialInstr.toLowerCase().includes('noclick')) {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Clicking on element.`);
    await selector.click();
  }

  if(localSpecialInstr.toLowerCase().includes('overwrite'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Current text is ${eleValue}. Overwriting text.`);
    await actions.doubleClick(selector).sendKeys(value).perform();
  } else {
    await actions.sendKeys(value).perform();
  }
  
  log.debug(`Post populate text field value: ${value}`);
};

module.exports = {
  populateInput,
  populateClick,
  populateSelect,
  populateRichTextField
};