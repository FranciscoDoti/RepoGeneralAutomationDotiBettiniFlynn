const { Then } = require('cucumber');
const { gradebook, filter } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);

Then('Only Google URL Link should display', async function () {
  console.log('need to assert something here;')
});
