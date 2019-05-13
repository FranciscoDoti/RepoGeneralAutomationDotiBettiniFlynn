/**
 * http://usejsdoc.org/
 */
'use strict';
const { expect } = require('chai');

const HashTable = require(`${process.cwd()}/app/hashtable`);
const StringProcessing = require(`${process.cwd()}/app/stringProcessing`);
const ScenarioData = require(`${process.cwd()}/app/scenarioData`);
const WebElement = require(`${process.cwd()}/app/WebElement`);
const { loadJSONFile } = require(`${process.cwd()}/app/util`);
const { getDriver, getWebDriver, sleep, activateTab, getURL } = require(`${process.cwd()}/app/driver`);
const { log } = require(`${process.cwd()}/app/logger`);
const { populateInput, populateClick, populateSelect, populateTextField } = require(`${process.cwd()}/app/populate`);

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
    await that.driver.switchTo().defaultContent();
    if (elementName == 'default') {
      // if frame name is default then see above
    } else {
      if (typeof elementName === 'number') {
        log.debug(`Switching to frame number ${elementName}`);
        await that.driver.switchTo().frame(elementName);
      } else {
        log.debug(`Switching to frame ${elementName}`);
        if (await checkWebElementExists(elementName)) {
          var WebElementData = await getElement(elementName);
          await that.driver.switchTo().frame(WebElementData.definition);
        }
      }
    }
  }

  const genericPopulateDatable = async function (table) {
    log.debug(`I populated table`);

    var rows = table.raw();
    var numberOfColumns = rows[0].length;
    var numberOfRows = rows.length - 1;

    for (let rowIndex = 1; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        console.log('TABLE: ', rows[0][columnIndex], rows[rowIndex][columnIndex]);
        await genericPopulateElement(rows[0][columnIndex], rows[rowIndex][columnIndex]);
      }
    }
  }

  const genericPopulateElement = async function (elementName, value) {
    let WebElementObject = '';
    let WebElementData = {};

    if (await hasElement(elementName)) {
      WebElementData = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = WebElementData;
      // if (WebElementData && WebElementData.waitForElementToBeInvisible) {
      //   if (await hasElement(WebElementData.waitForElementToBeInvisible)) {
      //     const elementToWaitToBeInvisible = await getElement(WebElementData.waitForElementToBeInvisible);
      //     actionElement.elementToWaitToBeInvisible = elementToWaitToBeInvisible;
      //   }
      // }
      // if (WebElementData && WebElementData.waitToBeVisible) {
      //   if (await hasElement(WebElementData.waitToBeVisible)) {
      //     const waitToBeVisible = await getElement(WebElementData.waitToBeVisible);
      //     actionElement.waitToBeVisible = waitToBeVisible;
      //   }
      // }

      // If need to hit a iframe, do it
      await switchFrame(WebElementData.frame);
      WebElementObject = await WebElement(WebElementData);
      actionElement.webElement = WebElementObject;

      const webElement = await WebElementObject.getWebElement();
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
        case 'th':
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
      let WebElementData = {};
      WebElementData = await getElement(elementName);
      // If need to hit a iframe, do it
      await switchFrame(WebElementData.frame);
      const WebElementObject = await WebElement(WebElementData);
      const elementList = await WebElementObject.getWebElements();
      return elementList
    } else {
      throw new Error(`Element ${elementName} not found.`);
    }
  }

  const getAttributeValue = async function (elementName, attributeName) {
    if (await hasElement(elementName)) {
      let WebElementData = {};
      WebElementData = await getElement(elementName);
      await switchFrame(WebElementData.frame);

      const WebElementObject = await WebElement(WebElementData);
      const webElement = await WebElementObject.getWebElement();
      var returnValue;
      if (attributeName === undefined) {
        returnValue = await webElement.getAttribute('innerText');
      } else if (attributeName.toLowerCase() === 'text') {
        returnValue = await webElement.getText();
      } else if (attributeName === 'selected') {
        returnValue = await webElement.isSelected();
      } else {
        returnValue = await webElement.getAttribute(attributeName);
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

  const assertElementExists = async function (elementName) {
    try {
      if (await checkWebElementExists(elementName)) {
        log.info(`Web Element ${elementName} found on page.`);
        return true;
      } else {
        log.info(`Web Element ${elementName} was not found on page.`);
        return false;
      };
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const assertElementDoesNotExist = async function (elementName) {
    try {
      if (await checkWebElementExists(elementName)) {
        log.info(`Web Element ${elementName} found on page.`);
        return false;
      } else {
        log.info(`Web Element ${elementName} was not found on page.`);
        return true;
      };
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const checkWebElementExists = async function (elementName) {
    let WebElementObject = '';
    let WebElementData = {};
    log.debug(`Checking to see if element: ${elementName} exists.`)
    if (await hasElement(elementName)) {
      WebElementData = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = WebElementData;
      /* if (WebElementData && WebElementData.waitForElementToBeInvisible) {
        if (await hasElement(WebElementData.waitForElementToBeInvisible)) {
          const elementToWaitToBeInvisible = await getElement(WebElementData.waitForElementToBeInvisible);
          actionElement.elementToWaitToBeInvisible = elementToWaitToBeInvisible;
        }
      }
      if (WebElementData && WebElementData.waitToBeVisible) {
        if (await hasElement(WebElementData.waitToBeVisible)) {
          const waitToBeVisible = await getElement(WebElementData.waitToBeVisible);
          actionElement.waitToBeVisible = waitToBeVisible;
        }
      }
*/
      // If need to hit a iframe, do it
      await switchFrame(WebElementData.frame);
      WebElementObject = await WebElement(WebElementData);
      actionElement.webElement = WebElementObject;
      return WebElementObject.elementExists();
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
    let WebElementObject = '';
    let WebElementData = {};
    log.debug(`Scrolling element: ${elementName} into view.`)
    if (await hasElement(elementName)) {
      WebElementData = await getElement(elementName);
      const actionElement = Object.assign({});
      // If need to hit a iframe, do it
      await switchFrame(WebElementData.frame);

      WebElementObject = await WebElement(WebElementData);
      actionElement.webElement = WebElementObject;



      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection for exists check.`);

      // const webElement = await WebElementObject.getWebElement();
      return await WebElementObject.scrollIntoView();
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
    let WebElementObject = '';
    let WebElementData = {};
    log.debug(`Checking to see if element: ${elementName} exists.`)
    if (await hasElement(elementName)) {
      WebElementData = await getElement(elementName);
      // If need to hit a iframe, do it
      await switchFrame(WebElementData.frame);

      WebElementObject = await WebElement(WebElementData);
      actionElement.webElement = WebElementObject;

      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection for exists check.`);

      // const webElement = await WebElementObject.getWebElement();
      return await WebElementObject.elementDisabled();
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during checkWebElementExists() attempt.`);
    }
  };

  const assert2 = async function (elementName, condition) {
    let WebElementObject = '';
    let WebElementData = {};
    log.debug(`Checking to see if element: ${elementName} exists.`)
    if (await hasElement(elementName)) {
      WebElementData = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = WebElementData;

      // If need to hit a iframe, do it
      await switchFrame(WebElementData.frame);

      WebElementObject = await WebElement(WebElementData);
      actionElement.webElement = WebElementObject;

      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection.`);

      const webElement = await WebElementObject.getWebElement();
      const tagName = await webElement.getTagName();

      switch (condition.toLowerCase()) {
        case 'disabled':
          return WebElementObject.elementDisabled();
          break;
        case 'exists':
          return WebElementObject.elementExists();
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
      const actualValue = await getAttributeValue(elementName);
      log.info(`Asserting text for "${elementName}"`);
      if(await expect(actualValue).to.equal(expectedValue)){
        log.info(`Actual value "${actualValue}" to equal Expected value "${expectedValue}"`);
      };
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const assertTextIncludes = async function (elementName, expectedValue) {
    try {
      const actualValue = await getAttributeValue(elementName);
      log.debug(`Expecting "${elementName}" -> "${actualValue}" to include "${expectedValue}"`);
      await expect(actualValue).to.include(expectedValue);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const getText = async function (elementName, attributeName) {
    try {
      return await getAttributeValue(elementName);
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
      log.debug(`Starting click the web element: ${strName}`);
      await genericPopulateElement(strName, 'click');
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const switchToTab = async function (tabName) {
    try {
      log.debug(`Switching to tab : ${tabName}`);
      await activateTab(tabName);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const getCurrentURL = async function () {
    try {
      log.debug(`Getting URL of the current tab.`);
      return await getURL();
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  that.assertText = assertText;
  that.assertTextIncludes = assertTextIncludes;
  that.assertDisabled = assertDisabled;
  that.elementDisabled = elementDisabled;
  that.getElement = getElement;
  that.hasElement = hasElement;
  that.getDriver = getDriver;
  that.populate = populateElement;
  that.click = clickElement;
  that.getAttributeValue = getAttributeValue;
  that.populateFromDataTable = genericPopulateDatable;
  that.populateDatatable = genericPopulateDatable;
  that.assertElementExists = assertElementExists;
  that.assertElementDoesNotExist = assertElementDoesNotExist;
  that.checkWebElementExists = checkWebElementExists;
  that.getWebElements = getWebElements;
  that.generateDataTable = generateDataTable;
  that.scrollElementIntoView = scrollElementIntoView;
  that.scrollIntoView = scrollIntoView;
  that.getText = getText;
  that.switchToTab = switchToTab;
  that.getCurrentURL = getCurrentURL;
  loadPageDefinitionFile(that.pageDefinitionFileName);
  return that;
}

module.exports = { PageObject };