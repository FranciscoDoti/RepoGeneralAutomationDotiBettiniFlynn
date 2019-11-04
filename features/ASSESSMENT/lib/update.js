const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const setTopic = async function (item) {
    if (item['Topic Level 1'] == undefined) {
        return;
    }
    await pages.update.click('Field', 'topic');
    await pages.update.click('Tree Element', item['Topic Level 1']);
    await pages.update.click('Tree Element', item['Topic Level 2']);
    await pages.update.waitForElementInvisibility('Spinner');
    await pages.update.click('Tree Element', item['Topic Level 3']);
    await pages.update.click('Tree Element', item['Topic Level 4']);
    await pages.update.click('Tree Element Leaf', item['Topic Level 5']);
    await pages.update.click('Button', 'Confirm');
    await pages.update.waitForElementInvisibility('Button', 'Confirm');
};

const setTaxonomy = async function (item) {
    if (item['Taxonomy Level 1'] == undefined) {
        return;
    }
    await pages.update.click('Field', 'taxonomy');
    let taxonomyLevel1Expanded = await pages.update.checkElementExists('Tree Element Leaf', item['Taxonomy Level 2']);
    if (!taxonomyLevel1Expanded) {
        await pages.update.click('Tree Element', item['Taxonomy Level 1']);
    }
    await pages.update.click('Tree Element Leaf', item['Taxonomy Level 2']);
    await pages.update.click('Button', 'Confirm');
    await pages.update.waitForElementInvisibility('Button', 'Confirm');
};

const setDifficulty = async function (difficulty) {
    if (difficulty == undefined) {
        return;
    }
    await pages.update.click('Field', 'difficulty');
    await pages.update.click('Option', difficulty);
};

const setStatus = async function (status) {
    if (status == undefined) {
        return;
    }
    await pages.update.click('Field', 'status');
    await pages.update.click('Option', status);
};

const setAccess = async function (access) {
    if (access == undefined) {
        return;
    }
    await pages.update.click('Field', 'scope');
    await pages.update.click('Option', access);
};

const save = async function () {
    await pages.update.click('Button', 'Save Changes');
    await pages.update.waitForElementInvisibility('Update Modal');
};

module.exports = {
    save,
    setAccess,
    setDifficulty,
    setStatus,
    setTaxonomy,
    setTopic
};