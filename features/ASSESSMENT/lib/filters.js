const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const {assert} = require('chai');


const setFilter = async function(filterText, optionText){
    await pages.filters.click('Filters');
    await pages.filters.click('Filter', filterText);
    await pages.filters.click('Option', optionText);
};

const verifyTag = async function(Filter, Option){
    if (Filter!=='Blooms'){
        await pages.filters.assertText('Filter Tag',Option, Filter+": "+ Option+" x");
    }else {
        await pages.filters.assertText('Filter Tag',Option.toLowerCase(), Filter+": "+ Option.toLowerCase()+" x");
    }
};

const removeFilter = async function(tagValue){
    await pages.filters.click('Filter Remove', tagValue);
    await pages.filters.assertElementDoesNotExist('Filter Tag', tagValue);
};


const tableWithResults= async function(index){
    let tableLength = await pages.filters.getAttributeValue('tableBody','tbody','childElementCount');
 
    if (index <= tableLength){
        return true;
    } else{
        return false;
    }

};

const verifyRow = async function(index,Option){
    let rowData = {};
    rowData =  await pages.filters.getAttributeValue('tableRow', index,'textContent');
    assert.include(rowData,Option, "Error. ",Option,"+ is not included into row data. Row Data: ",rowData);
    
};

const isMultipleOf  = async function(i ,multipleOf){
    var remainder = i % multipleOf;
     if (remainder == 0)
        { return true;}
     else
         { return false;} 
};

module.exports = {
    setFilter,
    verifyTag,
    removeFilter,
    tableWithResults,
    verifyRow,
    isMultipleOf
};
