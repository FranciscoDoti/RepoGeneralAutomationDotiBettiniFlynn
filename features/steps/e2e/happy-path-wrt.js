const {When, Then} = require('cucumber');
const {PageObject} = require('../../../app/pageObject');
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';

let pages = {
  coursetemplate: new PageObject('course-template-directory.json', coursewareStepsPath)

}
When('I click on create course plus button', async function () {
// var text = await getDriver().findElement(By.xpath("//*[@id='container']/div/div[2]/div/div/div/div/div[3]/div/button/div/div/span")).getText();
  let booleanVal = await pages.coursetemplate.checkWebElementExists('create_course');
  if (booleanVal == false) {
    await pages.coursetemplate.populate('Plus_button', 'click');
  } else if (booleanVal == true) {
    await pages.coursetemplate.populate('create_course', 'click');
  }
});
Then("I click on course card 'TestingCourse Writer's Help 3.0' template", async function () {
  await pages.coursetemplate.populate('course_card_writing', 'click');
});
