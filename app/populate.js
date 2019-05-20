
const { onWaitForElementToBeVisible, onPageLoadedWaitById, onWaitForElementToBeLocated, onWaitForWebElementToBeEnabled, onWaitForWebElementToBeDisabled, onWaitForElementToBeInvisible, sleep } = require('./driver');
const { By, Key } = require('selenium-webdriver');
const WebElement = require(`${process.cwd()}/app/WebElement`);
const { log } = require(`${process.cwd()}/app/logger`);

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

    case 'email':
    case 'text':
    case 'password':
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
      log.debug(
        'ERROR: populateInput() failed because the input type ' +
          selector.getAttribute('type') +
          ' has not been coded for.'
      );
  }
};

const populateSelect = async function (selector, item, WebElementData) {
  const localSpecialInstr = WebElementData.specialInstr || '';
  
  if (localSpecialInstr.toLowerCase().includes('selectByVisibleText'.toLowerCase())) {
    await selector.selectByVisibleText(item);
  } else if (localSpecialInstr.toLowerCase().includes('selectByValue'.toLowerCase())) {
    await selector.selectByValue(item);
  } else {
    const options = await selector.findElements(By.tagName('option'));
    for await (var option of options)
    {
      const optionText = await option.getText();
      if (item === optionText) {
        await option.click();
      }
    };
  }
  if (WebElementData.specialInstr === 'tabAfter') {
    await selector.sendKeys(Key.TAB);
  }
  if (WebElementData.specialInstr === 'enterAfter') {
    await selector.sendKeys(Key.RETURN);
  }
};

/* specialInstr values:
	* 		noClick - does not click on the field first
	* 		noClear - Does not clear the field of before sending  values to it.
	* 		overWrite - Selects the values in the field before over writing with the new value.  Does not clear the field.
	*
	*/
const populateTextField = async function (selector, value, WebElementObject) {
  let localSpecialInstr = '';
  const WebElementData = WebElementObject.element;
  const eleValue = await selector.getAttribute('value');
  if (WebElementData && WebElementData.specialInstr != null) {
    localSpecialInstr = WebElementData.specialInstr;
  }

  if(!localSpecialInstr.toLowerCase().includes('noclick'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Clicking on element.`);
    await selector.click();
  }

  if(!localSpecialInstr.toLowerCase().includes('overwrite'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Current text is ${eleValue}. Overwriting text.`);
  } else if(!localSpecialInstr.toLowerCase().includes('noclear'))
  {
    log.debug(`Special Instruction is : ${localSpecialInstr}. Current text is ${eleValue}. Clearing text.`);
    await selector.clear();
  }

  await selector.sendKeys(value);
  log.debug(`Post populate text field value: ${eleValue}`);

  if (localSpecialInstr.indexOf('tabAfter') > -1) {
    await selector.sendKeys(Key.chord(Key.TAB));
  }
  if (localSpecialInstr.indexOf('arrowDownAfter') > -1) {
    console.log('getting into arrow down')
    await selector.sendKeys(Key.DOWN);
  }
  if (localSpecialInstr.indexOf('enterAfter') > -1) {
    console.log('getting into return')
    await selector.sendKeys(Key.RETURN);
  }

  if (
    localSpecialInstr.toLowerCase().indexOf('waitAfter2secs'.toLowerCase()) > -1
  ) {
    try {
      log.debug('Sleeping 2 seconds: Text Field - waitAfter2secs');
      sleep(3000);
      log.debug('Waking up.');
    } catch (e) {
      log.error(e);
    }
  }
};

const populateClick = async function (selector, value, WebElementObject) {
  //console.log(`${selector}, ${value}, ${WebElementObject}`);
  
  const WebElementData = WebElementObject.element;
  let localSpecialInstr = '';
  if (WebElementData && WebElementData.specialInstr != null) {
    localSpecialInstr = WebElementData.specialInstr;
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

module.exports = {
  populateInput,
  populateClick,
  populateSelect,
  populateTextField
};