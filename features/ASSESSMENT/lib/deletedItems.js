const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { assert, expect} = require('chai');



const setFilter = async function (mainOption, subOption) {
  await pages.deletedItems.click('Filters');
  await pages.deletedItems.click('Filter', mainOption);
  await pages.deletedItems.click('Option', subOption);
};

const setTextFilter = async function(textFilter){
  await pages.deletedItems.populate('Text Filter', textFilter);
};

const searchResultCount = async function () {
    return await pages.deletedItems.getAttributeValue('Search Results', 'tbody', 'childElementCount'); 
  
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
        await pages.deletedItems.scrollElementIntoView('Load More');
        await pages.deletedItems.click('Load More');
      }
      i++;
    }
};

module.exports = {
    setFilter,
    setTextFilter,
    verifyItemswithFiltersApplied,
    verifyItemInRow,
    searchResultCount
};