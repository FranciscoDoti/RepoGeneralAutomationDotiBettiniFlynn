var session = require('../webdriver/driver-session');

var pageUtils = require('../utils/page');
var elementUtils = require('../utils/element');
var BasePageObject = require('./basePageObject');

class Page extends BasePageObject {
  constructor(props) {
    super(props);
    for (let [key, value] of Object.entries(this.things())) {
      this[key] = this.createSimplePO(value);
    }
  }

  elements(selector, type) {
    return elementUtils.findElements(selector, type);
  }

}

module.exports = Page;
