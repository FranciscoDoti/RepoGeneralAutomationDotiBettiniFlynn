/**
 * http://usejsdoc.org/
 */
const { getDriver, getWebDriver, onWaitForWebElementToBeDisabled } = require('./driver');
const { log } = require('./logger');
const that = {};

const WebElement = function (element) {
  let my = {};

  my.driver = getDriver();
  my.webdriver = getWebDriver();
  my.element = element;
  my.byType = element.byType.toLowerCase();
  my.definition = element ? element.definition : null;
  my.specialInstr = null;
  my.by = my.webdriver.By;

  that.getWebElement = async function () {
    const elementDef = await this.getBy();
    const returnElement = await my.driver.findElement(elementDef);
    return returnElement;
  };

  that.getWebElements = async function () {
    const elementDef = await this.getBy();
    const returnElement = await my.driver.findElements(elementDef);
    return returnElement;
  };

  that.elementExists = async function () {
    const elementDef = await this.getBy();
    // const returnExists = await my.driver.findElements(elementDef).size != 0;
    let returnExists = true;
    try {
      await my.driver.findElement(elementDef).isDisplayed();
    } catch(err) {
      // console.log(err);
      returnExists = false;
      return returnExists;
    }
    return returnExists;
  };

  that.scrollIntoView = async function () {
    const elementDef = await this.getBy();
    const returnElement = await my.driver.findElement(elementDef);
    const scrollToElement = await getDriver().executeScript('arguments[0].scrollIntoView()', returnElement);
    return scrollToElement;
  };

  that.elementDisabled = async function () {
    const elementDef = await this.getBy();
    const returnElement = await my.driver.findElement(elementDef);
    const returnDisabled = await my.driver.wait(my.webdriver.until.elementIsDisabled(returnElement), 3000);
    return returnDisabled;
  };

  that.getBy = async function () {
    let byReturn = null;
    const classType = my.byType.toLowerCase().trim();
    log.debug(`Getting element ${element.name} By: ${classType}`);
    switch (classType) {
      case 'xpath':
        byReturn = my.by.xpath(my.definition);
        break;
      case 'cssselector':
        byReturn = my.by.cssSelector(my.definition);
        break;
      case 'id':
        byReturn = my.by.id(my.definition);
        break;
      case 'name':
        byReturn = my.by.name(my.definition);
        break;
      case 'linktext':
        byReturn = my.by.linkText(my.definition);
        break;
      case 'classname':
        byReturn = my.by.className(my.definition);
        break;
      case 'partiallinktext':
        byReturn = my.by.partialLinkText(my.definition);
        break;
      case 'tagname':
        byReturn = my.by.tagName(my.definition);
        break;
      default:
        log.error(`The data asked to identify the element ${my.name}  by the type ${my.byType} and that type is not valid.  Please review the data and try again.`);
        log.error('Valid types are [xpath, cssSelector, id, name, linkText, partialLinkText, className, tagName]');
    }
    return byReturn;
  };
  return that;
};

module.exports = WebElement;
