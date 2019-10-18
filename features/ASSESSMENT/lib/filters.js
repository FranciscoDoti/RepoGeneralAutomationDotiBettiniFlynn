const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { assert } = require('chai');


const setFilter = async function (filterText, optionText) {
  await pages.filters.click('Filters');
  await pages.filters.click('Filter', filterText);
  await pages.filters.click('Option', optionText);
};

const verifyTag = async function (filter, option) {
  if (filter !== 'Blooms') {
    await pages.filters.assertText('Filter Tag', option, filter + ": " + option + " x");
  } else {
    await pages.filters.assertText('Filter Tag', option.toLowerCase(), filter + ": " + option.toLowerCase() + " x");
  }
};

const removeFilter = async function (tagText) {
  await pages.filters.click('Filter Remove', tagText);
  await pages.filters.assertElementDoesNotExist('Filter Tag', tagText);
};


const verifyNumberOfResults = async function () {
  return await pages.filters.getAttributeValue('Search Results', 'tbody', 'childElementCount');

};

const verifyRow = async function (index, option) {
  let rowData = {};
  rowData = await pages.filters.getAttributeValue('Search Result', index, 'textContent');
  assert.include(rowData, option, "Error. ", option, "+ is not included into row data. Row Data: ", rowData);

};

const isMultipleOf = async function (i, multipleOf) {
  return i % multipleOf == 0;
};

module.exports = {
  setFilter,
  verifyTag,
  removeFilter,
  verifyNumberOfResults,
  verifyRow,
  isMultipleOf
};
