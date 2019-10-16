const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const setFilter = async function(mainOption, subOption){
    await pages.filters.click('Filter');
    await pages.filters.click('mainOption',mainOption);
    await pages.filters.click('subOption', subOption);
};


const verifyTag = async function(mainOption, subOption){
    if (mainOption!=='Blooms'){
        await pages.filters.assertText('tag',subOption, mainOption+": "+subOption+" x");
    }else {
        await pages.filters.assertText('tag',subOption.toLowerCase(), mainOption+": "+subOption.toLowerCase()+" x");
    }
    

}

const closeTag = async function(tagValue){
    await pages.filters.click('closeTag',tagValue);
}



module.exports = {
    setFilter,
    verifyTag,
    closeTag
};
