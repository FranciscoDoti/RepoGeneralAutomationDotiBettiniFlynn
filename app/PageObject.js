/**
 * http://usejsdoc.org/
 */
'use strict';
const { assert, expect } = require('chai');
const HashTable = require(`${process.cwd()}/app/HashTable`);
const StringProcessing = require(`${process.cwd()}/app/StringProcessing`);
const ScenarioData = require(`${process.cwd()}/app/ScenarioData`);
const WebElement = require(`${process.cwd()}/app/WebElement`);
const { loadJSONFile } = require(`${process.cwd()}/app/util`);
const { getDriver, getWebDriver, sleep, activateTab, getURL, config } = require(`${process.cwd()}/app/driver`);
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

  const loadPageDefinitionFile = function (fullFileName) {
    var jsonContent = loadJSONFile(fullFileName);

    for (var i in jsonContent.webElements) {
      var element = jsonContent.webElements[i];
      addElement(element.name, element)
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

  const addDynamicElement = async function (elementName, additionalDescription) {
    if (typeof additionalDescription !== 'undefined' && await hasElement(elementName)) {
      var dynamicElement = JSON.parse(JSON.stringify(await that.pageElements.getItem(elementName)));
      dynamicElement.definition = dynamicElement.definition.replace('<ReplaceText>', additionalDescription);
      await addElement(elementName + additionalDescription, dynamicElement);
      return elementName + additionalDescription;
    }
  }

  const switchFrame = async function (elementName) {
    await that.driver.switchTo().defaultContent();
    if (elementName === 'default') {
      // if frame name is default then see above
    } else {
      if (typeof elementName === 'number') {
        log.debug(`Switching to frame number ${elementName}`);
        await that.driver.wait(that.webdriver.until.ableToSwitchToFrame(elementName, config.timeout));
      } else {
        log.debug(`Switching to frame ${elementName}`);
        if (await genericAssertElement(elementName, 'exists')) {
          const WebElementData = await getElement(elementName);
          const WebElementObject = await WebElement(WebElementData);
          const webElement = await WebElementObject.getWebElement();
          await that.driver.wait(that.webdriver.until.ableToSwitchToFrame(webElement, config.timeout));
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
        case 'textarea':
          await populateInput(webElement, value, actionElement);
          break;
        case 'a':
        case 'button':
        case 'div':
        case 'span':
        case 'ul':
        case 'li':
        case 'th':
        case 'h2':
        case 'section':
          await populateClick(webElement, value, actionElement);
          break;
        case 'select':
        case 'svg':
        case 'p':
          await populateSelect(webElement, value, actionElement);
          break;
        default:
          assert.fail(`ERROR: We tried to populate an unknown tag(${tagName}) of element(${elementName}) with data in populateGenericElement()\n\tWe failed.`);
      }
    } else {
      assert.fail(`ERROR: WebElement ${elementName} not found in PageElements during PopulateElement() attempt.`);
    }
  };

  const getWebElements = async function (elementName) {
    if (await hasElement(elementName)) {
      let WebElementData = {};
      WebElementData = await getElement(elementName);
      await switchFrame(WebElementData.frame);
      const WebElementObject = await WebElement(WebElementData);
      const elementList = await WebElementObject.getWebElements();
      return elementList
    } else {
      assert.fail(`Element ${elementName} not found.`);
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
        returnValue = await webElement.getAttribute('textContent');
      } else if (attributeName.toLowerCase() === 'text') {
        returnValue = await webElement.getText();
      } else if (attributeName === 'selected') {
        returnValue = await webElement.isSelected();
      } else {
        returnValue = await webElement.getAttribute(attributeName);
      }

      return returnValue;
    } else {
      assert.fail(`Element ${elementName} not found.`);
      throw new Error(`Element ${elementName} not found.`);
    }
  }

  const generateDataTable = async function (padLength) {
    var localPadLength = padLength || 0;
    const _NA = "| NA".padEnd(localPadLength + 1);
    console.log(`\nGenerating data table for ${that.pageName} \n`);
    try {
      // Return a | delimited list of the field names in the pageDefs file for this PageObject
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
      await switchFrame(WebElementData.frame);
      WebElementObject = await WebElement(WebElementData);
      actionElement.webElement = WebElementObject;
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection for exists check.`);
      return await WebElementObject.scrollIntoView();
    } else {
      assert.fail(`ERROR: WebElement ${elementName} not found in PageElements during scrollElementIntoView() attempt.`);
    }
  };

  const genericAssertElement = async function (elementName, value) {
    let WebElementObject = '';
    let WebElementData = {};

    if (await hasElement(elementName)) {
      WebElementData = await getElement(elementName);
      const actionElement = Object.assign({});
      actionElement.element = WebElementData;
      await switchFrame(WebElementData.frame);
      WebElementObject = await WebElement(WebElementData);
      actionElement.webElement = WebElementObject;

      switch (value.toLowerCase()) {
        case 'notexists':
          await getDriver().manage().setTimeouts({ implicit: 5000 });
          let retval = !(await WebElementObject.elementExists());
          await getDriver().manage().setTimeouts({ implicit: config.timeout });
          return retval;
        case 'visible':
        case 'exists':
          return (await WebElementObject.elementExists());
        case 'notvisible':
        case 'disabled':
          return (await WebElementObject.elementDisabled());
      }
    } else {
      assert.fail(`ERROR: WebElement ${elementName} not found in PageElements during PopulateElement() attempt.`);
    }
  };

  const assertExists = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    if (await genericAssertElement(elementName, 'exists')) {
      log.info(`Web Element ${elementName} found on page. PASS`);
    } else {
      assert.fail(`Web Element ${elementName} was not found on page.`);
    };
  };

  const assertDoesNotExist = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    if (await genericAssertElement(elementName, 'notexists')) {
      log.info(`Web Element ${elementName} was not found on page. PASS`);
    } else {
      assert.fail(`Web Element ${elementName} found on page.`);
    };
  };

  const assertDisabled = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    if (await genericAssertElement(elementName, 'disabled')) {
      log.info(`Web Element ${elementName} is disabled. PASS`);
    } else {
      assert.fail(`Web Element ${elementName} is not disabled.`);
    };
  };

  const assertText = async function (elementName, replaceText, expectedValue) {
    if (expectedValue === undefined) {
      expectedValue = replaceText;
    } else {
      await addDynamicElement(elementName, replaceText);
      elementName = elementName + (replaceText || '');
    }

    try {
      const actualValue = await getAttributeValue(elementName);
      log.info(`Asserting text for "${elementName}".`);
      if (await expect(actualValue).to.equal(expectedValue)) {
        log.info(`Actual value "${actualValue}" equals Expected value "${expectedValue}". PASS`);
      };
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const assertTextIncludes = async function (elementName, replaceText, expectedValue) {
    if (expectedValue === undefined) {
      expectedValue = replaceText;
    } else {
      await addDynamicElement(elementName, replaceText);
      elementName = elementName + (replaceText || '');
    }

    try {
      const actualValue = await getAttributeValue(elementName);
      log.info(`Asserting text for "${elementName}".`);
      if (await expect(actualValue).to.include(expectedValue)) {
        log.info(`Actual value "${actualValue}" includes Expected value "${expectedValue}". PASS`);
      };
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const getText = async function (elementName) {
    try {
      return await getAttributeValue(elementName);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const populateElement = async function (elementName, replaceText, strValue) {
    if (strValue === undefined) {
      strValue = replaceText;
    } else {
      await addDynamicElement(elementName, replaceText);
      elementName = elementName + (replaceText || '');
    }

    try {
      log.info(`Starting populate the web element: ${elementName} with value ${strValue}`);
      strValue = await sp.strEval(strValue);
      await genericPopulateElement(elementName, strValue);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const clickElement = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    try {
      log.debug(`Starting click the web element: ${elementName}`);
      await genericPopulateElement(elementName, 'click');
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
  that.getElement = getElement;
  that.hasElement = hasElement;
  that.getDriver = getDriver;
  that.populate = populateElement;
  that.click = clickElement;
  that.getAttributeValue = getAttributeValue;
  that.addDynamicElement = addDynamicElement;
  that.populateFromDataTable = genericPopulateDatable;
  that.populateDatatable = genericPopulateDatable;
  that.assertElementExists = assertExists;
  that.assertElementDoesNotExist = assertDoesNotExist;
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