const { When } = require('cucumber');
const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);

When('I toggle percents', async function () {
  await pages.gradebook.waitForElementVisibility('percentsToggleButton');
  await pages.gradebook.click('percentsToggleButton');
});

When('I toggle points', async function () {
  await pages.gradebook.waitForElementVisibility('pointsToggleButton');
  await pages.gradebook.click('pointsToggleButton');
});

When(/^I add the activities in courseplanner to my course$/, async function (dataTable) {
  const courseName = this.data.get('courseName');
  await coursePages.createCourse.click('courseCard', courseName);
  await coursePages.coursePage.click('navigation','Browse');
  for (let i = 0; i < dataTable.rows().length; i++) {
    await coursePages.coursePlanner.populate('librarySearchInput', dataTable.hashes()[i].activity);
    await coursePages.coursePlanner.click('addAssignmentButton', dataTable.hashes()[i].activity);
    if(i===0) {
      await coursePages.coursePlanner.click('addingContent');
      await coursePages.coursePlanner.click('continue');
      await coursePages.home.click('closeAlert');
    }
  }
});

When(/^I edit students grades$/, async function (dataTable) {
  // if (courseName) {
  //   await coursePages.createCourse.waitForElementVisibility('courseCard', courseName);
  //   await coursePages.createCourse.click('courseCard', courseName);
  // }
  await coursePages.coursePage.click('navigation', 'Gradebook');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const user = this.users[dataTable.hashes()[i].student];
    await coursePages.gradebook.click('editTotal', user.firstName)
    await coursePages.gradebook.populate('editGrade', dataTable.hashes()[i].editGrade);
    await coursePages.gradebook.click('save', 'Save');
  }
  await sleep(2000);
});
