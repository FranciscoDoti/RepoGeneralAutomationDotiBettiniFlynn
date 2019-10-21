const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { assert } = require('chai');


const setFilter = async function (filterText, optionText) {
  await pages.filters.click('Filters');
  await pages.filters.click('Filter', filterText);
  await pages.filters.click('Option', optionText);
};

const verifyTag = async function (tagText) {
  
  assertElementExists('Filter Tag', tagText.toUpperCase())

};

const verifyItemsWithFilterApplied = async function(option) {
    var i=1;
    while ( i<= await filterslib.searchResultCount()) {
        await filterslib.verifyTextInRow(i,option);
        if ( i%200 == 0  && i<=999){
            await pages.filters.scrollElementIntoView('Load More');
            await pages.filters.click('Load More');
        }
        i++;
  } 
}

const removeFilter = async function (tagText) {
  await pages.filters.click('Filter Remove', tagText);
  await pages.filters.assertElementDoesNotExist('Filter Tag', tagText);
};


const searchResultCount = async function () {
  return await pages.filters.getAttributeValue('Search Results', 'tbody', 'childElementCount');

};

const verifyTextInRow = async function (index, option) {
  let rowData = {};
  rowData = await pages.filters.getAttributeValue('Search Result', index, 'textContent');
  expect(rowData).to.include(option);
};


module.exports = {
  setFilter,
  verifyTag,
  removeFilter,
  searchResultCount,
  verifyTextInRow,
  verifyItemsWithFilterApplied
};
