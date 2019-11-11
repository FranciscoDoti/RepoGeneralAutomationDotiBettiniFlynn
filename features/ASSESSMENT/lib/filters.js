const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { assert, expect} = require('chai');



const setFilter = async function (filterText, optionText) {
  await pages.filters.click('Filters');
  await pages.filters.click('Filter', filterText);
  await pages.filters.click('Option', optionText);
};

const setTextFilter = async function(textFilter){
  await pages.filters.populate('Text Filter', textFilter);
};
const verifyTag = async function (tagText) {

  await pages.filters.assertElementExists('Filter Tag', tagText.toUpperCase());

};

const searchResultCount = async function () {
  return await pages.filters.getAttributeValue('Search Results', 'tbody', 'childElementCount');

};

const verifyTextInRow = async function (index, option) {
  let rowData = {};
  rowData = await pages.filters.getAttributeValue('Search Result', index, 'textContent');
  expect(rowData).to.include(option);
};

const verifyItemsWithFilterApplied = async function (option) {
  let i = 1;
  while (i <= await searchResultCount()) {
    await verifyTextInRow(i, option);
    if (i % 200 == 0 && i <= 999) {
      await pages.filters.scrollElementIntoView('Load More');
      await pages.filters.click('Load More');
    }
    i++;
  }
};

const verifyItemsWithMultipleFilterApplied = async function (options) {
  let i = 1;
  while (i <= await searchResultCount()) {
    for (let j=0; j< options.length;j++){
      await verifyTextInRow(i, options[j]);
    }
  
    if (i % 200 == 0 && i <= 999) {
      await pages.filters.scrollElementIntoView('Load More');
      await pages.filters.click('Load More');
    }
    i++;
  }
};

const removeFilter = async function (tagText) {
  await pages.filters.click('Filter Remove', tagText);
  await pages.filters.assertElementDoesNotExist('Filter Tag', tagText);
};

const verifyThatCountResultHasIncreased = async function() {
  let results= await searchResultCount();
  assert(results>200, 'Current quantity of table results:'+ results);
}; 


module.exports = {
  setFilter,
  setTextFilter,
  verifyTag,
  removeFilter,
  searchResultCount,
  verifyTextInRow,
  verifyItemsWithFilterApplied,
  verifyItemsWithMultipleFilterApplied,
  verifyThatCountResultHasIncreased
};
