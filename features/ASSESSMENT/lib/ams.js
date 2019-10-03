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
    await pages.ams.click('Delete Confirmation Dialog Button', 'Delete');
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
    deleteItems,
    openUpdateModal,
    updateDone,
    verifyItemDetails,
    waitAlgoliaProcess
};