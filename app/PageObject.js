/**
 * http://usejsdoc.org/
 */
'use strict';
const { assert } = require('chai');

const HashTable = require('./hashtable');
const StringProcessing = require('./stringProcessing');
const ScenarioData = require('./scenarioData');
const WebElement = require('./WebElement');
const { loadJSONFile } = require('./util');
const { getDriver, getWebDriver, sleep } = require('./driver');
const { log } = require('./logger');

const { populateInput, populateClick, populateSelect, populateTextField } = require('./populate');

const PageObject = function (pageNameInput, pageNameDirectoryInput) {
  var that = {};
  that.ScenarioData = ScenarioData;

  let sp = StringProcessing(that.ScenarioData);
  that.sp = sp;
  that.pageName = pageNameInput;
  that.pageDefinitionFileName = pageNameDirectoryInput + pageNameInput;
  that.pageElements = new HashTable({}); // a hash of all of the web elements for this page.

  that.driver = getDriver();
  that.webdriver = getWebDriver();

  // log.debug(`New PageObject: ${pageNameInput}`);

  const loadPageDefinitionFile = function (fullFileName) {
    // log.debug(`Opening file ${fullFileName} from ${__filename} `);
    var jsonContent = loadJSONFile(fullFileName);

    for (var i in jsonContent.webElements) {
      var element = jsonContent.webElements[i];
      addElement(element.name, element)
      // This was adding so much noise to the console output
      // log.debug(`Adding Element - name: "${element.name}", type: "${element.byType}", value: "${element.definition}"`);
    }
  }

  const addElement = function (elementName, elements) {
    that.pageElements.setItem(elementName, elements);
  }

  const getElement = async function (elementName) {
    return that.pageElements.getItem(elementName);
  }

  const hasElement = async function (elementName) {
    return that.pageElements.hasItem(elementName);
  }

  const switchFrame = async function (elementName) {
    // log.debug('Checking need to switch to iframe');
    let isNumber = true;
    if (typeof elementName !== 'number') {
      isNumber = false;
    }
    // elementName is the name of the frame element in the json file. if it is default, switch to frame(0)
    if ((!isNumber && !elementName) || elementName === 'default') {
      // log.debug('Do nothing, no frame set: ' + elementName);
    } else { // else , look up the frame element in the hash table. get the webElement for the frame switch to the frame.
      if (isNumber) {
        log.debug('Switching Frame to frame via number(' + elementName + ')');
        that.driver.switchTo().frame(elementName);
      } else {
        var frameElementObj = await getElement(elementName);
        that.driver.switchTo().frame(frameElementObj.definition);
        await sleep(500);
      }
    }
  }

  const genericPopulateDatable = async function (table) {
    log.debug(`I populated table`);

    var rows = table.raw();
    var numberOfColumns = rows[0].length;
    var numberOfRows = rows.length - 1;

    // each row will be an object with table header as a key
    // console.log('Column count: ', rows[0].length);
    // console.log('row : ', 0, rows[0]);
    // console.log('row : ', 1, rows[1]);

    for (let rowIndex = 1; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        console.log('TABLE: ', rows[0][columnIndex], rows[rowIndex][columnIndex]);
        //  console.log('pageDef: ' + table.hashes()[rowIndex][1] + 'value ' + table.hashes()[rowIndex].value)
        await genericPopulateElement(rows[0][columnIndex], rows[rowIndex][columnIndex]);
      }
    }
  }

  const genericPopulateElement = async function (elementName, value) {
    let elementTarget = '';
    let tempElement = {};

    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = tempElement;
      // if (tempElement && tempElement.waitForElementToBeInvisible) {
      //   if (await hasElement(tempElement.waitForElementToBeInvisible)) {
      //     const elementToWaitToBeInvisible = await getElement(tempElement.waitForElementToBeInvisible);
      //     actionElement.elementToWaitToBeInvisible = elementToWaitToBeInvisible;
      //   }
      // }
      // if (tempElement && tempElement.waitToBeVisible) {
      //   if (await hasElement(tempElement.waitToBeVisible)) {
      //     const waitToBeVisible = await getElement(tempElement.waitToBeVisible);
      //     actionElement.waitToBeVisible = waitToBeVisible;
      //   }
      // }

      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);
      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;

      // log.debug(`****genericPopulateElement: ${elementName}`);

      const webElement = await elementTarget.getWebElement();
      const tagName = await webElement.getTagName();
      
      switch (tagName.toLowerCase()) {
        case 'input':  
        await populateInput(webElement, value, actionElement);
          break;
        case 'textarea':
          await populateTextField(webElement, value, actionElement);
          break;
        case 'a':
          await populateClick(webElement, value, actionElement);
          break;
        case 'button':
          await populateClick(webElement, value, actionElement);
          break;
        case 'div':
          await populateClick(webElement, value, actionElement);
          break;
        case 'span':
          await populateClick(webElement, value, actionElement);
          break;
        case 'ul':
          await populateClick(webElement, value, actionElement);
          break;
        case 'select':
          await populateSelect(webElement, value, actionElement);
          break;
        case 'svg':
          await populateSelect(webElement, value, actionElement);
          break;
        case 'p':
          await populateSelect(webElement, value, actionElement);
          break;
        default:
          log.error(`ERROR: We tried to populate an unknown tag(${elementName}) with data in populateGenericElement()\n\tWe failed.`);
      }
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during PopulateElement() attempt.`);
    }
  };

  const getWebElements = async function (elementName) {
    if (await hasElement(elementName)) {
      let tempElement = {};
      tempElement = await getElement(elementName);
      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);
      const elementTarget = await WebElement(tempElement);
      const elementList = await elementTarget.getWebElements();
      return elementList
    } else {
      throw new Error(`Element ${elementName} not found.`);
    }
  }

  const getElementValue = async function (elementName, attributeName) {
    if (await hasElement(elementName)) {
      let tempElement = {};
      tempElement = await getElement(elementName);
      await switchFrame(tempElement.frame);

      const elementTarget = await WebElement(tempElement);
      const webElement = await elementTarget.getWebElement();
      var returnValue;
      if (attributeName === undefined || attributeName.toLowerCase() === 'text') {
        returnValue = await webElement.getText();
      }
      if (attributeName) {
        if (attributeName === 'selected') {
          returnValue = await webElement.isSelected();
        } else {
          returnValue = await webElement.getAttribute(attributeName);
        }
      }
      return returnValue;
    } else {
      throw new Error(`Element ${elementName} not found.`);
    }
  }

  const generateDataTable = async function (padLength) {
    var localPadLength = padLength || 0;
    const _NA = "| NA".padEnd(localPadLength + 1);
    console.log(`\nGenerating data table for ${that.pageName} \n`);
    try {
      // Return a | delimited list of the field names in the pageDefs file for this pageObject
      console.log("|" + that.pageElements.keyList("|", localPadLength));

      // Generate a list of NA for the page object.
      var NAList = "";
      var i;
      var elementCount = that.pageElements.length; 
      for (i = 0; i < elementCount; i++) { 
        NAList += _NA;
      }
      console.log(`${NAList}|`);

    } catch (err) {
        log.error(err.stack);
        throw err;
    }
  }

  const elementExists = async function (strName) {
    try {
      log.info(`Starting to check if web element exists on the page: ${strName}`);
      return await checkWebElementExists(strName);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const checkWebElementExists = async function (elementName) {
    let elementTarget = '';
    let tempElement = {};
    log.debug(`Checking to see if element: ${elementName} exists.`)
    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = tempElement;
      /* if (tempElement && tempElement.waitForElementToBeInvisible) {
        if (await hasElement(tempElement.waitForElementToBeInvisible)) {
          const elementToWaitToBeInvisible = await getElement(tempElement.waitForElementToBeInvisible);
          actionElement.elementToWaitToBeInvisible = elementToWaitToBeInvisible;
        }
      }
      if (tempElement && tempElement.waitToBeVisible) {
        if (await hasElement(tempElement.waitToBeVisible)) {
          const waitToBeVisible = await getElement(tempElement.waitToBeVisible);
          actionElement.waitToBeVisible = waitToBeVisible;
        }
      }
*/
      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;

      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection for exists check.`);

      // const webElement = await elementTarget.getWebElement();
      return elementTarget.elementExists();
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during checkWebElementExists() attempt.`);
      return false;
    }
  };

  const scrollIntoView = async function (strName) {
    try {
      log.info(`Scrolling into view: ${strName}`);
      return await scrollElementIntoView(strName);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const scrollElementIntoView = async function (elementName) {
    let elementTarget = '';
    let tempElement = {};
    log.debug(`Scrolling element: ${elementName} into view.`)
    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      const actionElement = Object.assign({});
      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;



      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection for exists check.`);

      // const webElement = await elementTarget.getWebElement();
      return await elementTarget.scrollIntoView();
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during scrollElementIntoView() attempt.`);
    }
  };

  const elementDisabled = async function (strName) {
    try {
      log.info(`Starting to check if web element disabled on the page: ${strName}`);

      return await assertDisabled(strName);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const assertDisabled = async function (elementName) {
    let elementTarget = '';
    let tempElement = {};
    log.debug(`Checking to see if element: ${elementName} exists.`)
    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;

      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection for exists check.`);

      // const webElement = await elementTarget.getWebElement();
      return await elementTarget.elementDisabled();
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during checkWebElementExists() attempt.`);
    }
  };

  const assert2 = async function (elementName, condition) {
    let elementTarget = '';
    let tempElement = {};
    log.debug(`Checking to see if element: ${elementName} exists.`)
    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = tempElement;

      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;

      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection.`);

      const webElement = await elementTarget.getWebElement();
      const tagName = await webElement.getTagName();

      switch (condition.toLowerCase()) {
        case 'disabled':
          return elementTarget.elementDisabled();
          break;
        case 'exists':
          return elementTarget.elementExists();
          break;
        default:
          log.error(`ERROR: We tried to assert that an unknown tag(${elementName}) is ${condition}\n\tWe failed.`);
      }
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during assert() attempt.`);
    }
  };

  const assertText = async function (elementName, expectedValue) {
    try {
      const actualValue = await getElementValue(elementName);
      log.debug(`Expected "${elementName}" -> "${actualValue}" to equal "${expectedValue}"`);
      await this.assert.equal(actualValue, expectedValue, `Expected ${elementName} -> ${actualValue} to equal ${expectedValue}`);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };
  const assertTextIncludes = async function (elementName, expectedValue) {
    try {
      const actualValue = await getElementValue(elementName);
      log.debug(`Expected "${elementName}" -> "${actualValue}" to include "${expectedValue}"`);
      await this.assert(actualValue.includes(expectedValue), `Expected ${elementName} -> ${actualValue} to include ${expectedValue}`);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const getText = async function (elementName, attributeName) {
    try {
      return await that.driver.getElementValue(elementName, attributeName);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const populateElement = async function (strName, strValue) {
    try {
      log.info(`Starting populate the web element: ${strName} with value ${strValue}`);
      strValue = await sp.strEval(strValue);

      await genericPopulateElement(strName, strValue);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const clickElement = async function (strName) {
    try {
      log.info(`Starting click the web element: ${strName}`);
      
      await genericPopulateElement(strName, 'click');
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  that.assert = assert;
  that.assertText = assertText;
  that.assertTextIncludes = assertTextIncludes;
  that.assertDisabled = assertDisabled;
  that.elementDisabled = elementDisabled;
  that.getElement = getElement;
  that.hasElement = hasElement;
  that.getDriver = getDriver;
  that.populate = populateElement;
  that.click = clickElement;
  that.getElementValue = getElementValue;
  that.populateFromDataTable = genericPopulateDatable;
  that.populateDatatable = genericPopulateDatable;
  that.populateElement = populateElement;
  that.elementExists = elementExists;
  that.checkWebElementExists = checkWebElementExists;
  that.getWebElements = getWebElements;
  that.generateDataTable = generateDataTable;
  that.scrollElementIntoView = scrollElementIntoView;
  that.scrollIntoView = scrollIntoView;
  that.getText = getText;
  loadPageDefinitionFile(that.pageDefinitionFileName);
  return that;
}

module.exports = { PageObject };
