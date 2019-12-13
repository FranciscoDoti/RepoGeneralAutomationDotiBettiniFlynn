const { When } = require('cucumber');
const { gradebook, filter } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);

When('Instructor filters on the last 7 days', async function () {
  await filter.waitClick('showFilters');
  await filter.waitClick('showDateRange');
  await filter.waitClick('lastSevenDays');
  await filter.waitClick('showFilters');
});

