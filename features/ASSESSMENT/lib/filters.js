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

const verifyItemInRow = async function(rowNumber, filters, textFilter){
  let rowData = await pages.filters.getAttributeValue('Search Result', rowNumber, 'textContent');
  
  if (filters === undefined && textFilter!== undefined){
      
      expect(rowData).to.include(textFilter);
  }else if (textFilter === undefined && filters !== undefined){
      for (let i=0;i< filters.length; i++){
          expect(rowData).to.include(filters[i].Option);
      }

  }else{
      expect(rowData).to.include(textFilter);
      for (let i=0;i< filters.length; i++){
          expect(rowData).to.include(filters[i].Option);
      }

  }
};

const verifyItemswithFiltersApplied = async function(filters,textFilter){
  let i = 1;
  while (i <= await searchResultCount()) {  
      await verifyItemInRow(i, filters, textFilter);     
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
  verifyItemInRow,
  verifyItemswithFiltersApplied,
  verifyThatCountResultHasIncreased
};
