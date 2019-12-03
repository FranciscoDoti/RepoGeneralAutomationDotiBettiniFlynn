const { Then } = require('cucumber');
const { expect } = require('chai');
const { sleep } = require(`${process.cwd()}/app/driver`);
const { iclicker, gradebook } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const { getCategoryName } = require('../data/test_value_generator');

Then('Points are displayed in the course total', async function () {
  await gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText();
  expect(text).to.equal('50.00\nOut of 100');
});

Then('Percents are displayed in the course total', async function () {
  await gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText();
  expect(text).to.equal('50%');
});

Then('The settings button is visible', async function () {
  await gradebook.waitForElementVisibility('settingsNav');
});

Then('A new category should appear in the Gradebook', async function () {
  await gradebook.waitForElementVisibility('singleCategory');
  const newCategoryName = getCategoryName();
  await gradebook.assertElementExists('categoryHeaderCells', newCategoryName);
});

Then('No categories should appear in the Gradebook', async function () {
  await gradebook.waitForElementVisibility('singleCategory');
  const cells = await gradebook.getWebElements('categoryHeaderCells');
  const text = await cells[0].getText();
  const newCategoryName = getCategoryName();
  expect(text).to.contains(newCategoryName);
});

Then('The sync button should be visible', async function () {
  await iclicker.waitForElementVisibility('syncIClicker');
});
Then('The iclicker menu should be visible', async function () {
  await iclicker.waitForElementVisibility('iClickerMenu');
});

Then('The settings button is visible', async function () {
  await gradebook.waitForElementVisibility('settingsNav');
});

Then('I verify the grades for students', async function (dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    await gradebook.assertTextIncludes('gradeRowCell', `${row}_${column}`, `${dataTable.hashes()[i].grade}`);
  }
});

Then(/^I verify the grade "(.*)" is not droped for row "(.*)" and column "(.*)"$/, async function (grade, row, column) {
  await sleep(2000);
  await gradebook.assertTextIncludes('gradeRowCell', `${row}_${column}`, `${grade}`);
  await gradebook.assertTextDoesNotInclude('gradeRowCell', `${row}_${column}`, 'Dropped');
});

Then('I verify that the grade is dropped', async function (dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    await gradebook.assertTextIncludes('gradeRowCell', `${row}_${column}`, `${dataTable.hashes()[i].grade}Dropped`);
  }
});

Then('I verify the category total', async function (dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    await gradebook.assertTextIncludes('categoryTotalRowCell', `${row}_${column}`, dataTable.hashes()[i].categoryTotal)
  }
});

Then('I verify the course total', async function (dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    let user = this.users[dataTable.hashes()[i].student];
    await gradebook.assertTextIncludes('courseTotal', user.firstName, dataTable.hashes()[i].courseTotal);
  }
});

Then('I verify grade override modal has correct data', async function (dataTable) {
  await coursePages.coursePage.click('navigation', 'Gradebook');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    const feedback = dataTable.hashes()[i].feedback;
    const originalGrade = dataTable.hashes()[i].originalGrade;
    await gradebook.waitForElementVisibility(`editGradeButton`, `${row}_${column}`);
    await gradebook.click(`editGradeButton`, `${row}_${column}`);

    await gradebook.assertTextIncludes('editGradeComment', feedback);
    await gradebook.assertTextIncludes('originalGradeOverride', originalGrade);
    await gradebook.click('cancelGradeOverride');
  }
  await sleep(2000);
});
