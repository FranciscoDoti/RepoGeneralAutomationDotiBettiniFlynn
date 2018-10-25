
const { getWebDriver, onWaitForElementToBeVisible, onPageLoadedWaitById, onWaitForElementToBeLocated, onWaitForWebElementToBeEnabled, onWaitForElementToBeInvisible, sleep } = require('./driver');
const {Key} = require('selenium-webdriver');
const WebElement = require('./WebElement');
const { log } = require('./logger');

const populateInput = async function (eleTarget, strValue, actionElement) {
  const type = await eleTarget.getAttribute('type');
  switch (type) {
    case 'radio':
      if (strValue.toLowerCase() === 'click') {
        log.debug('Clicking radio button');
        await eleTarget.click();
      } else {
        log.debug('By passing radio button click');
      }
      break;
    case 'email':
    case 'text':
      await populateTextField(eleTarget, strValue, actionElement);
      break;

    case 'password':
      await populateTextField(eleTarget, strValue, actionElement);
      break;

    case 'checkbox':
      if (strValue.toLowerCase() === 'click') {
        await populateClick(eleTarget, strValue, actionElement);
      } else {
        log.debug('Bypassing the checkbox click');
      }
      break;
    case 'button':
      if (strValue.toLowerCase() === 'click') {
        await populateClick(eleTarget, strValue, actionElement);
      } else {
        log.debug('Bypassing the button click');
      }
      break;
    default:
      log.debug(
        'ERROR: populateInput() failed because the input type ' +
          eleTarget.getAttribute('type') +
          ' has not been coded for.'
      );
  }
};

const populateSelect = async function (selector, item, tempElement) {
  const webDriver = getWebDriver();
  const localSpecialInstr = tempElement.specialInstr || '';

  if (!selector) return;
  await selector.click();
  await sleep(500);

  const options = await selector.findElements(webDriver.By.tagName('option'));

  if (localSpecialInstr.toLowerCase().includes('selectByVisibleText'.toLowerCase())) {
    await selector.selectByVisibleText(item);
  } else if (localSpecialInstr.toLowerCase().includes('selectByValue'.toLowerCase())) {
    await selector.selectByValue(item);
  } else {
    await options.forEach(async function (option) {
      const optionText = await option.getText();
      log.debug(`Item: ${item} - ${optionText}`);
      console.log(`Item: ${item} - ${optionText}`);
      if (item === optionText) {
        await option.click();
      }
    });
  }
  if (tempElement.specialInstr === 'tabAfter') {
    await selector.sendKeys(Keys.TAB);
  }
  if (tempElement.specialInstr === 'enterAfter') {
    await selector.sendKeys(Keys.RETURN);
  }
};

/* specialInstr values:
	* 		noClick - does not click on the field first
	* 		noClear - Does not clear the field of before sending  values to it.
	* 		overWrite - Selects the values in the field before over writing with the new value.  Does not clear the field.
	*
	*/
const populateTextField = async function (eleTarget, strValue, actionElement) {
  let localSpecialInstr = '';
  const tempElement = actionElement.element;
  const eleValue = await eleTarget.getAttribute('value');
  if (tempElement && tempElement.specialInstr != null) {
    localSpecialInstr = tempElement.specialInstr;
  }

  if (
    localSpecialInstr &&
    !localSpecialInstr.toLowerCase().indexOf('noclick') > -1
  ) {
    log.debug('Clicking text field.');
    await eleTarget.click();
  }

  if (localSpecialInstr.toLowerCase().indexOf('overwrite') > -1) {
    log.debug(`Pre overwrite text field value: ${eleValue}`);
  } else if (!localSpecialInstr.toLowerCase().indexOf('noclear') > -1) {
    log.debug(`Pre clear text field value: ${eleValue}`);
    await eleTarget.clear();
  }

  await eleTarget.sendKeys(strValue);
  log.debug(`Post populate text field value: ${eleValue}`);

  if (localSpecialInstr.indexOf('tabAfter') > -1) {
    await eleTarget.sendKeys(Key.chord(Key.TAB));
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

const populateClick = async function (eleTarget, strValue, actionElement) {
  const tempElement = actionElement.element;
  let localSpecialInstr = '';
  if (tempElement && tempElement.specialInstr != null) {
    localSpecialInstr = tempElement.specialInstr;
  }

  if (strValue.toLowerCase() === 'click') {
    if (tempElement && tempElement.waitForElementToBeEnabled) {
      log.debug('Waiting until element to be enabled');
      const webElementTarget = await WebElement(tempElement);
      const webElement = await webElementTarget.getWebElement();
      await onWaitForWebElementToBeEnabled(webElement);
      await sleep(500);
    }

    await eleTarget.click();
    await sleep(500);

    if (tempElement && tempElement.waitIdToBeVisibleonNextPage) {
      log.debug('Waiting until page loads after click');
      await onPageLoadedWaitById(tempElement.waitIdToBeVisibleonNextPage);
      await sleep(500);
    }

    if (tempElement && tempElement.waitToBeVisible) {
      log.debug(`Waiting until tempElement (${tempElement}) to be visible`);
      const webElementTarget = await WebElement(actionElement.waitToBeVisible);
      const webElement = await webElementTarget.getBy();
      await onWaitForElementToBeVisible(webElement);
      await sleep(500);
    }

    log.debug('Clicked web element');
  }

  if (actionElement && actionElement.elementToWaitToBeInvisible) {
    log.debug(`Waiting until actionElement (${actionElement}) to be invisible`);
    const webElementTarget = await WebElement(actionElement.elementToWaitToBeInvisible);
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
