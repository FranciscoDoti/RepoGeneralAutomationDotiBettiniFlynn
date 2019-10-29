const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const addRaptorItem = async function () {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.assertElementExists('Add Item', 'Easy');
    await pages.ams.click('Add Item', 'Raptor');
};

const openUpdateModal = async function () {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.click('AMS Button', 'VIEW SELECTED ITEMS');
    await pages.ams.click('AMS Button', 'Select Action');
    await pages.ams.click('AMS Button', 'Update');
};

const deleteItems = async function () {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.click('AMS Button', 'VIEW SELECTED ITEMS');
    await pages.ams.click('AMS Button', 'Select Action');
    await pages.ams.click('AMS Button', 'Delete');
    let deletedItemsCount = (await pages.ams.getText('Delete Confirmation Message Title')).split(" ")[1];
    await pages.ams.assertElementExists('Delete Confirmation Message Text');
    await pages.ams.click('Delete Confirmation Dialog Button', 'Delete');
    await pages.ams.waitForElementInvisibility('Delete Modal');
    return deletedItemsCount;
};

const deleteItem = async function (itemId) {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.click('Delete Action', itemId);
    await pages.ams.assertElementExists('Delete Confirmation Message Title');
    await pages.ams.click('Delete Confirmation Dialog Button', 'Delete');
};

const duplicateItem = async function (itemId) {
    await pages.ams.click('Duplicate Item', itemId);
    await pages.raptor.switchToTab('Raptor Authoring');
    await pages.raptor.waitForElementVisibility('Tab','question');
    await pages.raptor.assertElementExists('Item ID');
    let duplicatedItemId = await pages.raptor.getText('Item ID');
    duplicatedItemId = duplicatedItemId.split(":")[1].trim();
    return duplicatedItemId;
};

const updateDone = async function () {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.click('AMS Button', 'Select Action');
    await pages.ams.click('AMS Button', 'Done');
};

const waitAlgoliaProcess = async function () {
    await pages.ams.switchToTab('Sapling Learning Author Management System');
    await pages.ams.waitForElementInvisibility('Algolia is Processing');
};

const verifyFeedback = async function (itemTabs) {
    await pages.ams.click('Feedback Tab', (itemTabs['Tab Name']).toLowerCase());
    if (itemTabs['Tab Name'] == 'Solution') {
        await pages.ams.assertElementExists('Solution Feedback', itemTabs['Feedback Text']);
    }
    else {
        await pages.ams.assertElementExists('Feedback Side Panel', itemTabs['Feedback Text']);
    }
};

const verifyItemDetails = async function (item, itemId) {
    if (item['Author Mode'] !== undefined) {
        await pages.ams.assertText('Item Field', 'authoring-tool-' + itemId, item['Author Mode']);
    }
    if (item.Title !== undefined) {
        await pages.ams.assertText('Item Field', 'title-' + itemId, item.Title);
    }
    if (item.Topic !== undefined) {
        await pages.ams.assertText('Item Field', 'topic-' + itemId, item.Topic);
    }
    if (item.Taxonomy !== undefined) {
        await pages.ams.assertText('Item Field', 'taxonomy-' + itemId, item.Taxonomy);
    }
    if (item.Difficulty !== undefined) {
        await pages.ams.assertText('Item Field', 'difficulty-' + itemId, item.Difficulty);
    }
    if (item.Status !== undefined) {
        await pages.ams.assertText('Item Field', 'status-' + itemId, item.Status);
    }
    if (item['Module Type'] !== undefined) {
        await pages.ams.assertText('Item Field', 'module_type-' + itemId, item['Module Type']);
    }
    if (item.Access !== undefined) {
        await pages.ams.assertText('Item Field', 'access_type-' + itemId, item.Access);
    }
};

module.exports = {
    addRaptorItem,
    deleteItem,
    deleteItems,
    openUpdateModal,
    updateDone,
    verifyItemDetails,
    waitAlgoliaProcess,
    verifyFeedback,
    duplicateItem
};