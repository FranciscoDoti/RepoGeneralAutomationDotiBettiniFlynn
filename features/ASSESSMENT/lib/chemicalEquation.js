const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const configureContext = async function (context, item) {
    await pages.chemicalEquation.click('CEE Module Context');
    await pages.chemicalEquation.click('CEE Context Setup', context + ' Setup');
    await pages.chemicalEquation.populate('CEE Correct Setup Answer', item['Text']);
    await pages.raptor.click('Editor Panel Done Button');
}
module.exports = {
    configureContext
  };