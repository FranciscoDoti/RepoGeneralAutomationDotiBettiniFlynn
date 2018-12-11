var session = require('../webdriver/driver-session');

var pageUtils = require('../utils/page');
var elementUtils = require('../utils/element');

class BasePageObject {
  constructor(props) {
    Object.assign(this, props);
  }

  createSimplePO(opts) {
    return async function(v) {
      opts.type = (opts.type || 'css');
      switch (typeof v) {
      case 'undefined':
        return opts;
      case 'string':
        // this is surprisingly vital even for things that guaranteed only appear once
        // .elements returns [], so can be empty.  .element throws if none are found
        // so you MUST use .elements to check for 0 on the page.
        if (v === 'all') {
          return this.elements(opts.locator, opts.type); }
        else {
          throw new Error(`Don't know how to '${v}' for {${opts.type}}: ${opts.locator}}`); }
      case 'number':
        return this.elements(opts.locator, opts.type).then(els => els[v - 1]);
      default:
        console.log(typeof v);
        console.log(v);
        throw new Error('WUTINTARNATION!');
      }
    };
  }
}

module.exports = BasePageObject;
