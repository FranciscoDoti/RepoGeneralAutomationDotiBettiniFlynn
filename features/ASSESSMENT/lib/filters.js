const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const setFilter = async function(filterText, optionText){
    await pages.filters.click('Filters');
    await pages.filters.click('Filter', filterText);
    await pages.filters.click('Option', optionText);
    await pages.filters.assertElementExists('Filter Tag', `${filterText}: ${optionText}`);
};

const verifyTag = async function(tagText){
    await pages.filters.assertElementExists('Filter Tag', tagText);
}

const removeFilter = async function(tagText){
    await pages.filters.click('Filter Remove', tagText);
    await pages.filters.assertElementDoesNotExist('Filter Tag', tagText);
}

module.exports = {
    setFilter,
    verifyTag,
    removeFilter
};
