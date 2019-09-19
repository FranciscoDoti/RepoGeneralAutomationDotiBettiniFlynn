/**
 * http://usejsdoc.org/
 */
const { getDriver, getWebDriver, onWaitForWebElementToBeDisabled } = require(`${process.cwd()}/app/driver`);
const { log } = require(`${process.cwd()}/app/logger`);
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
    const definition = await this.getBy();
    return await my.driver.findElement(definition);
  };

  that.getWebElements = async function () {
    const definition = await this.getBy();
    return await my.driver.findElements(definition);
  };

  that.elementDisplayed = async function () {
    const definition = await this.getBy();
    try{
      return await my.driver.findElement(definition).isDisplayed();
    } catch(err){
      return false;
    };
  };

  that.scrollIntoView = async function () {
    const definition = await this.getBy();
    const returnElement = await my.driver.findElement(definition);
    return await getDriver().executeScript('arguments[0].scrollIntoView(); window.scrollBy(0, -window.innerHeight / 4);', returnElement);
  };

  that.elementDisabled = async function () {
    const definition = await this.getBy();
    const returnElement = await my.driver.findElement(definition);
    return await my.driver.wait(my.webdriver.until.elementIsDisabled(returnElement), 3000);
  };

  that.waitForVisibility = async function (timeoutInSeconds) {
    const definition = await this.getBy();
    const wait = (await my.driver.manage().getTimeouts()).implicit;
    await my.driver.manage().setTimeouts({ implicit: 1000});
    let visibility = await my.driver.wait(async function () {
      let elements = await my.driver.findElements(definition);
      if (elements.length > 0) {
        return true;
      };
    }, timeoutInSeconds*1000);
    await my.driver.manage().setTimeouts({ implicit: wait});
    return visibility;
  };

  that.waitForInvisibility = async function (timeoutInSeconds) {
    const definition = await this.getBy();
    const wait = (await my.driver.manage().getTimeouts()).implicit;
    await my.driver.manage().setTimeouts({ implicit: 1000});
    let invisibility = await my.driver.wait(async function () {
      let elements = await my.driver.findElements(definition);
      if (elements.length <= 0) {
        return true;
      };
    }, timeoutInSeconds*1000);
    await my.driver.manage().setTimeouts({ implicit: wait});
    return invisibility;
  };

  that.getBy = async function () {
    let byReturn = null;
    const classType = my.byType.toLowerCase().trim();
    log.debug(`Getting element ${element.name} By: ${classType} for ${my.definition}`);
    switch (classType) {
      case 'xpath':
        byReturn = my.by.xpath(my.definition);
        break;
      case 'css':
        byReturn = my.by.css(my.definition);
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