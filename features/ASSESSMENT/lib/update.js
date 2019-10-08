const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const setTopic = async function (item) {
    await pages.update.click('Field', 'topic');
    await pages.update.click('Tree Element', item['Topic Level1']);
    await pages.update.click('Tree Element', item['Topic Level2']);
    await pages.update.click('Tree Element', item['Topic Level3']);
    await pages.update.click('Tree Element', item['Topic Level4']);
    await pages.update.click('Tree Element Leaf', item['Topic Level5']);
    await pages.update.click('Button', 'Confirm');
};

const setTaxonomy = async function (item) {
    await pages.update.click('Field', 'taxonomy');
    await pages.update.click('Tree Element Leaf', item['Taxonomy Level2']);
    await pages.update.click('Button', 'Confirm');
};

const setDifficulty = async function (difficulty) {
    await pages.update.click('Field', 'difficulty');
    await pages.update.click('Option', difficulty);
};

const setStatus = async function (status) {
    await pages.update.click('Field', 'status');
    await pages.update.click('Option', status);
};

const setAccess = async function (access) {
    await pages.update.click('Field', 'scope');
    await pages.update.click('Option', access);
};

const save = async function () {
    await pages.update.click('Button', 'Save Changes');
};
const cancel = async function () {
    await pages.update.click('Button', 'Cancel');
};

module.exports = {
    save,
    setAccess,
    setDifficulty,
    setStatus,
    setTaxonomy,
    setTopic,
    cancel
};