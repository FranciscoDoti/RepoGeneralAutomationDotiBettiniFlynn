const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const config = require('../../../config.js');


When('I click on course card of Quant Template', async function () {
  await pages.coursetemplate.populate('course_card_Qant', 'click');
});

When('I click on course card of Quant Template as instructor', async function () {
  await pages.coursetemplate.populate('course_card_quant_instructor', 'click', 'resources_tab');
});
