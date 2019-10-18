const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const {assert} = require('chai');


const setFilter = async function(filterText, optionText){
    await pages.filters.click('Filters');
    await pages.filters.click('Filter', filterText);
    await pages.filters.click('Option', optionText);
    await pages.filters.assertElementExists('Filter Tag', `${filterText}: ${optionText}`);
};

<<<<<<< HEAD
const verifyTag = async function(mainOption, subOption){
    if (mainOption!=='Blooms'){
        await pages.filters.assertText('tag',subOption, mainOption+": "+subOption+" x");
    }else {
        await pages.filters.assertText('tag',subOption.toLowerCase(), mainOption+": "+subOption.toLowerCase()+" x");
    }
};

const removeFilter = async function(tagText){
    await pages.filters.click('Filter Remove', tagText);
    await pages.filters.assertElementDoesNotExist('Filter Tag', tagText);
};


const tableWithResults= async function(index){
    let tableLength = await pages.filters.getAttributeValue('tableBody','tbody','childElementCount');
 
    if (index <= tableLength){
        return true;
    } else{
        return false;
    }

};

const verifyRow = async function(index,subOption){
    let rowData = {};
    rowData =  await pages.filters.getAttributeValue('tableRow', index,'textContent');
    assert.include(rowData,subOption, "Error. ",subOption,"+ is not included into row data. Row Data: ",rowData);
    
};

const isMultipleOf  = async function(i ,multipleOf){
    var remainder = i % multipleOf;
     if (remainder == 0)
        { return true;}
     else
         { return false;} 
};
=======
const verifyTag = async function(tagText){
    await pages.filters.assertElementExists('Filter Tag', tagText);
}

const removeFilter = async function(tagText){
    await pages.filters.click('Filter Remove', tagText);
    await pages.filters.assertElementDoesNotExist('Filter Tag', tagText);
}
>>>>>>> d8d4d9ebd366c80286a41a2cd9d155f1e808dc49

module.exports = {
    setFilter,
    verifyTag,
<<<<<<< HEAD
    removeFilter,
    tableWithResults,
    verifyRow,
    isMultipleOf
};
=======
    removeFilter
};
>>>>>>> d8d4d9ebd366c80286a41a2cd9d155f1e808dc49
