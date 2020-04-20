const { Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { amslib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

Then('I verify the details of the following items are displayed in the Item Details modal', async function (datatable) {
  await amslib.waitAlgoliaProcess();
  for (i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    await pages.ams.click('Item ID Link', this.data.get(item.Title).id);
    await updatelib.verifyItemDetails(item);
  }
  await updatelib.close();
});
