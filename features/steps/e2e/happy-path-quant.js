const {When, Then} = require('cucumber');
const {PageObject} = require('../../../app/pageObject');
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
let pages = {
  coursetemplate: new PageObject('course-template-directory.json', coursewareStepsPath)
}
When('I click on course card of Quant Template', async function () {
  await pages.coursetemplate.populate('course_card_Qant', 'click');
});
When('I click on course card of Quant Template as instructor', async function () {
  await pages.coursetemplate.populate('course_card_quant_instructor', 'click', 'resources_tab');
});
