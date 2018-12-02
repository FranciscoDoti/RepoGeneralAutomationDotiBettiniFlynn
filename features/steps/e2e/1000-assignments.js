const {When, Then, After} = require('cucumber');
const stepsPath = process.cwd() + '/features/pageDefs/';
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const {getDriver, sleep} = require('../../../app/driver');
const {By} = require('selenium-webdriver');
let pages = {
  navigation: new PageObject('navigation.json', stepsPath),
  courseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath),
  activityTab: new PageObject('activity-tab.json', coursewareStepsPath),
  resourceView: new PageObject('resource-tab-view.json', coursewareStepsPath),
  courseplanner: new PageObject('course-planner-teb-view.json', coursewareStepsPath)
}

When('I click on create custom activity first', async function () {
  for (var i = 0; i <= 1000; i++) {
    await pages.resourceView.populate('Add_button', 'click');  
    await pages.resourceView.populate('Create_coustom_task', 'click');
    await sleep(3000);
    await pages.resourceView.populate('select_assesment_assignment', 'click');
    await sleep(10000);
    await getDriver().switchTo().frame(0);
    await sleep(3000);
    let booleanVal = await pages.resourceView.checkWebElementExists('Home_taxonomy');
    if (booleanVal === false) {
      await pages.resourceView.populate('Assignment_Title', '1');
      await pages.resourceView.populate('Assignment_Type', 'Test', 'click');
      await pages.resourceView.populate('Save_Assesement_button', 'click');
    } else {
      await pages.resourceView.populate('Assignment_Title', '1');
      await pages.resourceView.populate('Assignment_Type', 'Test', 'click');
      await pages.resourceView.populate('Home_taxonomy', 'Interactive General Chemistry V1', 'click');
      await pages.resourceView.populate('Save_Assesement_button', 'click');
    }
    await sleep(10000);
    await getDriver().findElement(By.xpath('(//*[@id="Group-4-Copy-2"])[1]')).click();
    await pages.resourceView.populate('Add_assignment_button', 'click');
    await sleep(5000);
    await getDriver().navigate().refresh();
    await sleep(3000);
  }
});
// When('I click on assignment button', async function () {
//   await sleep(10000);
//   await getDriver().findElement(By.xpath('(//*[@id="Group-4-Copy-2"])[1]')).click();
//   await pages.resourceView.populate('Add_assignment_button', 'click');
//   await sleep(5000);
//   await getDriver().navigate().refresh();
// //   } else if (booleanVal === true) {
// //     await pages.resourceView.populate('Assignment_Title', '1');
// //     await pages.resourceView.populate('Assignment_Type', 'Test');
// //     await pages.resourceView.populate('Save_Assesement_button', 'click');
// //     await pages.resourseView, populate('select_all_questions','click');
// //   }
// //   }
// });
