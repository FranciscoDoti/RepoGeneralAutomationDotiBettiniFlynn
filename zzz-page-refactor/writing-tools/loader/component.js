var elementUtils = require('../utils/element');
var BasePageObject = require('./basePageObject');

class Component extends BasePageObject {
  constructor(locator, index) {
    super();
    this.rootNode = locator
    this.rootIndex = index || 1;
    for (let [key, value] of Object.entries(this.things())) {
      this[key] = this.createSimplePO(value);
    }
  }

  createSimplePO(value) {
    let _this = this;
    if (!value.type) { value.type = 'css'; }
    return async function(arg) {
      let rootEl = await elementUtils.findElements(_this.rootNode.locator, _this.rootNode.type)
          .then(els => {
            return els[_this.rootIndex - 1];
          });
      rootEl = await rootEl;
      if (!rootEl) {throw new Error(`Can't find any such component to mount as:  ${_this.rootNode.locator}`)}
      let elementLocator = elementUtils.getLocator(value.locator, value.type);

      let result = await rootEl.findElements(elementLocator)
          .then(els => {
            if (arg === 'all') {
              return els; }
            else {
              return els[arg - 1]
            }
          });
      if (!result) {return []; }
      result._root = elementUtils.getLocator(_this.rootNode.locator);
      result._rootIndex = _this.rootIndex;
      result._locator = elementLocator;
      return result;
    }

  }

  static generate(index, locator) { return new this(locator, index); }

  async element(selector, type) { throw new Error("Actually, I guess we were using that.") }
  async elements(selector, type) { throw new Error("Actually, I guess we were using those.") }

}

module.exports = Component;
