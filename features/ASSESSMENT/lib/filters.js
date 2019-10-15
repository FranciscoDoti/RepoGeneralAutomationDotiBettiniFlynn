const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const setFilter = async function(mainOption, subOption){
    await pages.filters.click('Filter');
    await pages.filters.click('mainOption',mainOption);
    await pages.filters.click('subOption', subOption);
};





const verifyTab = async function(subOption){
    await pages.filters.assertText('tag',subOption);

}

const closeTag = async function(tagValue){
    await pages.filters.click('closeTag',tagValue);
}



module.exports = {
    setFilter,
    verifyTab,
    closeTag
};
