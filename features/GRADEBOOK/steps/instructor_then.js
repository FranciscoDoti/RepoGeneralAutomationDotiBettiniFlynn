const { Then } = require('cucumber');
const { expect } = require('chai');
const { sleep } = require(`${process.cwd()}/app/driver`);
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

Then('I should see points displayed in the course total', async function () {
  await pages.gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await pages.gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50.00\nOut of 100');
});

Then('I should see percents displayed in the course total', async function () {
  await pages.gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await pages.gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50%');
});

Then('I should see the settings button appear', async function () {
  await pages.gradebook.waitForElementVisibility('settingsNav');
});

Then('I verify the grades for students', async function (dataTable){
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    await pages.gradebook.assertTextIncludes('gradeRowCell', `${row}_${column}`, `${dataTable.hashes()[i].grade}`);
  }
});

Then(/^I verify the grade "(.*)" is not droped for row "(.*)" and column "(.*)"$/, async function (grade, row, column) {
  await sleep(2000);
  await pages.gradebook.assertTextIncludes('gradeRowCell', `${row}_${column}`, `${grade}`);
  await pages.gradebook.assertTextDoesNotInclude('gradeRowCell', `${row}_${column}`, 'Dropped');
});

Then('I verify that the grade is dropped', async function (dataTable){
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    await pages.gradebook.assertTextIncludes('gradeRowCell', `${row}_${column}`, `${dataTable.hashes()[i].grade}Dropped`);
  }
});

Then('I verify the category total', async function (dataTable){
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    await pages.gradebook.assertTextIncludes('categoryTotalRowCell', `${row}_${column}`, dataTable.hashes()[i].categoryTotal)
  }
});

Then('I verify the course total', async function (dataTable){
  for (let i = 0; i < dataTable.rows().length; i++) {
    let user = this.users[dataTable.hashes()[i].student];
    await pages.gradebook.assertTextIncludes('courseTotal', user.firstName, dataTable.hashes()[i].courseTotal);
  }
});

Then('I verify grade override modal has correct data', async function (dataTable){
  await coursePages.coursePage.click('navigation', 'Gradebook');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    const feedback = dataTable.hashes()[i].feedback;
    const originalGrade = dataTable.hashes()[i].originalGrade;
    await pages.gradebook.waitForElementVisibility(`editGradeButton`, `${row}_${column}`);
    await pages.gradebook.click(`editGradeButton`, `${row}_${column}`);

    await pages.gradebook.assertTextIncludes('editGradeComment', feedback);
    await pages.gradebook.assertTextIncludes('originalGradeOverride', originalGrade);
    await pages.gradebook.click('cancelGradeOverride');
  }
  await sleep(2000);
});