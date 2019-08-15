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
const { getDriver, getWebDriver, activateTab, getURL, getTitle, config } = require(`${process.cwd()}/app/driver`);
const { log } = require(`${process.cwd()}/app/logger`);
const { populateInput, populateClick, populateSelect, populateRichTextField } = require(`${process.cwd()}/app/populate`);

const PageObject = function (pageNameInput, pageNameDirectoryInput) {
  var that = {};
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
        if (await genericAssertElement(elementName, 'displayed')) {
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
          value == 'click' ? await populateClick(webElement, value, actionElement) : await populateRichTextField(webElement, value, actionElement);
          break;
        case 'svg':
          value == 'click' ? await populateClick(webElement, value, actionElement) : await populateSelect(webElement, value, actionElement);
          break;
        case 'select':
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

  const getWebElements = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    
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

  const getAttributeValue = async function (elementName, replaceText, attributeName) {
    if (attributeName !== undefined && replaceText === undefined) {
      attributeName = replaceText;
    } else {
      await addDynamicElement(elementName, replaceText);
      elementName = elementName + (replaceText || '');
    }

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
        case 'notdisplayed':
          await getDriver().manage().setTimeouts({ implicit: 5000 });
          let retval = !(await WebElementObject.elementDisplayed());
          await getDriver().manage().setTimeouts({ implicit: config.timeout });
          return retval;
        case 'visible':
        case 'displayed':
          return (await WebElementObject.elementDisplayed());
        case 'notvisible':
        case 'disabled':
          return (await WebElementObject.elementDisabled());
        case 'exists':
          var collection = await WebElementObject.getWebElements();
          return collection.length > 0 ? true : false;          
      }
    } else {
      assert.fail(`ERROR: WebElement ${elementName} not found in PageElements during PopulateElement() attempt.`);
    }
  };

  const assertExists = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    if (await genericAssertElement(elementName, 'exists')) {
      log.info(`Web Element ${elementName} exists on page. PASS`);
    } else {
      assert.fail(`Web Element ${elementName} does not exist on page.`);
    };
  };

  const assertElementExists = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    if (await genericAssertElement(elementName, 'displayed')) {
      log.info(`Web Element ${elementName} is displayed on page. PASS`);
    } else {
      assert.fail(`Web Element ${elementName} is not displayed on page.`);
    };
  };

  const assertElementDoesNotExist = async function (elementName, replaceText) {
    await addDynamicElement(elementName, replaceText);
    elementName = elementName + (replaceText || '');
    if (await genericAssertElement(elementName, 'notdisplayed')) {
      log.info(`Web Element ${elementName} is not displayed on page. PASS`);
    } else {
      assert.fail(`Web Element ${elementName} is displayed on page.`);
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
    if (expectedValue === undefined) { expectedValue = replaceText };
    try {
      const actualValue = await getAttributeValue(elementName, replaceText);
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
    if (expectedValue === undefined) { expectedValue = replaceText };
    try {
      const actualValue = await getAttributeValue(elementName, replaceText);
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

  const closeTab = async function (tabName) {
    try {
      log.debug(`Closing tab : ${tabName}`);
      await activateTab(tabName);
      await getDriver().close();
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

  const assertPageTitle = async function (expectedValue) {
    try {
      const actualValue = await getPageTitle();
      log.info(`Asserting page title match for current tab.`);
      if (await expect(actualValue).to.equal(expectedValue)) {
        log.info(`Actual value "${actualValue}" equals Expected value "${expectedValue}". PASS`);
      };
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const assertPageTitleIncludes = async function (expectedValue) {
    try {
      const actualValue = await getPageTitle();
      log.info(`Asserting page title partial match for current tab.`);
      if (await expect(actualValue).to.include(expectedValue)) {
        log.info(`Actual value "${actualValue}" includes Expected value "${expectedValue}". PASS`);
      };
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const getPageTitle = async function () {
    try {
      log.debug(`Getting the title of the current tab.`);
      return await getTitle();
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const acceptAlert = async function(){
    await genericAlertOperations('accept');
    log.info(`Accepted alert popup.`);
  };

  const dismissAlert = async function(){
    await genericAlertOperations('dismiss');
    log.info(`Dismissed alert popup.`);
  };

  const getAlertText = async function(){
    log.debug("Getting text in alert popup.");
    let actualValue = await genericAlertOperations('text');
    log.info(`${actualValue} is displayed in the alert popup.`);
    return actualValue;
  };

  const assertAlertText = async function(expectedValue){
    log.debug("Asserting text in alert popup.");
    let actualValue = await genericAlertOperations('text');
    if (actualValue === expectedValue) {
      log.info(`Actual value "${actualValue}" matches Expected value "${expectedValue}". PASS`);
    } else {
      assert.fail(`Actual value "${actualValue}" does not match Expected value "${expectedValue}". FAIL`);
    };
  };

  const assertAlertTextIncludes = async function(expectedValue){
    log.debug("Asserting text in alert popup.");
    let actualValue = await genericAlertOperations('text');
    if (actualValue.includes(expectedValue)) {
      log.info(`Actual value "${actualValue}" includes Expected value "${expectedValue}". PASS`);
    } else {
      assert.fail(`Actual value "${actualValue}" does not include Expected value "${expectedValue}". FAIL`);
    };
  };

  const genericAlertOperations = async function(operation){
    if (await that.driver.wait(that.webdriver.until.alertIsPresent())){
      let alert = that.driver.switchTo().alert();
      switch (operation.toLowerCase()){
        case 'accept':
          await alert.accept();
          break;
        case 'dismiss':
          await alert.dismiss();
          break;
        case 'text':
          return (await alert.getText());
          break;
        default:
          assert.fail(`ERROR: ${operation} is not implemented in genericAlertOperations().`)
      }
    } else {
      assert.fail(`ERROR: Assert pop up was not displayed.`);
    };
  };

  that.acceptAlert = acceptAlert;
  that.dismissAlert = dismissAlert;
  that.getAlertText = getAlertText;
  that.assertAlertText = assertAlertText;
  that.assertAlertTextIncludes = assertAlertTextIncludes;
  that.assertExists = assertExists;
  that.assertText = assertText;
  that.assertTextIncludes = assertTextIncludes;
  that.assertDisabled = assertDisabled;
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
  that.getWebElements = getWebElements;
  that.generateDataTable = generateDataTable;
  that.scrollElementIntoView = scrollElementIntoView;
  that.getText = getText;
  that.switchToTab = switchToTab;
  that.closeTab = closeTab;
  that.getCurrentURL = getCurrentURL;
  that.getPageTitle=getPageTitle;
  that.assertPageTitle=assertPageTitle;
  that.assertPageTitleIncludes=assertPageTitleIncludes;
  that.addDynamicElement=addDynamicElement;
  loadPageDefinitionFile(that.pageDefinitionFileName);
  return that;
}

module.exports = { PageObject };