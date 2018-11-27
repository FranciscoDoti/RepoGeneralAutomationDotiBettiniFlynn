const {When, Then} = require('cucumber');
const {PageObject} = require('../../../app/pageObject');
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';

let pages = {
  courseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath)

}
When('I click on create course plus button', async function () {
// var text = await getDriver().findElement(By.xpath("//*[@id='container']/div/div[2]/div/div/div/div/div[3]/div/button/div/div/span")).getText();
  let booleanVal = await pages.courseTemplate.checkWebElementExists('create_course');
  if (booleanVal == false) {
    await pages.courseTemplate.populate('Plus_button', 'click');
  } else if (booleanVal == true) {
    await pages.courseTemplate.populate('create_course', 'click');
  }
});
Then("I click on course card 'TestingCourse Writer's Help 3.0' template", async function () {
  await pages.courseTemplate.populate('course_card_writing', 'click');
});
