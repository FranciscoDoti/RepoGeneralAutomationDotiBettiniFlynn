const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then(/^the topic report card for "(.*)" should have the score "(.*)"$/, async function (topic, score) {
  await pages.studentAssignment.assertTextIncludes('Topic Report', topic, score);
});
