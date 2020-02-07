const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const setItemType = async function (itemType) {
    await pages.raptor.click('More Menu');
    await pages.raptor.click('Item Details');
    await pages.raptor.click('Item Details Item Type', itemType);
    await pages.raptor.click('Item Details Done Button');
    await pages.raptor.waitForElementInvisibility('Item Details Done Button');
};

const giveFormat = async function () {
    await pages.relatedSet.waitForElementVisibility('Editor Panel Text Field', 'Table Title');
    await pages.relatedSet.populate('Editor Panel Text Field', 'Table Title', '**Smart data**');
};

const setUpTrials = async function (targetTrials) {
    let existingTrials = (await pages.relatedSet.getWebElements('Grid Columns')).length - 1;

    while (existingTrials < targetTrials) {
        await pages.relatedSet.click('Editor Panel Button', 'Add Trial');
        existingTrials++;
    }

    while (existingTrials > targetTrials) {
        await pages.relatedSet.click('Column Title', existingTrials + 1);
        await pages.relatedSet.click('Editor Panel Button', 'Delete Selected Trial');
        existingTrials--;
    }
};

const setUpVariables = async function (variables) {
    let existingVariables = (await pages.relatedSet.getWebElements('Grid Rows')).length - 1;
    let targetVariables = variables.rows().length;

    while (existingVariables < targetVariables) {
        await pages.relatedSet.click('Editor Panel Button', 'Add Variable');
        existingVariables++;
    }

    while (existingVariables > targetVariables) {
        await pages.relatedSet.click('Variable Title', existingVariables + 1);
        await pages.relatedSet.click('Editor Panel Button', 'Delete Selected Variable');
        existingVariables--;
    }

    for (let i = 0; i < targetVariables; i++) {
        let variable = variables.hashes()[i];

        await pages.relatedSet.click('Variable Title', i + 2);
        await pages.relatedSet.populate('Editor Panel Text Field', 'Header Name', variable['Header Name']);
        await pages.relatedSet.populate('Editor Panel Text Field', 'Variable Name', variable['Variable Name']);
    }
};

const setUpChildren = async function (children) {
    let childrenCount = children.rows().length;

    for (let i = 0; i < childrenCount; i++) {
        let child = children.hashes()[i];
        await pages.relatedSet.click('Add Child Button');
        await pages.relatedSet.populate('Child ID Input', i + 1, child["Child ID"]);
    }
};

module.exports = {
    setItemType,
    giveFormat,
    setUpTrials,
    setUpVariables,
    setUpChildren
};