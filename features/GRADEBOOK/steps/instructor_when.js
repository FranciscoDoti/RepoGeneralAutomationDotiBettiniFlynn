const { When } = require('cucumber');

const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const { gradebook, filter } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { assignStudents, unassignStudents, assingEveryone } = require('../helpers');
const { sleep } = require(`${process.cwd()}/app/driver`);

When('Instructor toggle percents', async function () {
  await gradebook.waitForElementVisibility('percentsToggleButton');
  await gradebook.click('percentsToggleButton');
});

When('Instructor toggle points', async function () {
  await gradebook.waitForElementVisibility('pointsToggleButton');
  await gradebook.click('pointsToggleButton');
});

When(/^Instructor assigns students to activities in courseplanner$/, assignStudents);
When(/^Instructor assigns everyone to activities in courseplanner$/, assingEveryone);

When(/^I assign students to activities in courseplanner$/, async function (dataTable) {
  const courseName = this.data.get('courseName');
  await coursePages.createCourse.click('courseCard', courseName);
  await assignStudents.call(this, dataTable);
});

When('Instructor unassigns activity {string} in courseplanner', unassignStudents);

When(/^I edit students grades$/, async function (dataTable) {
  await coursePages.coursePage.waitClick('navigation', 'Gradebook');
  for (let i = 0; i < dataTable.rows().length; i++) {
    const row = dataTable.hashes()[i].row;
    const column = dataTable.hashes()[i].column;
    const grade = dataTable.hashes()[i].grade;
    const feedback = dataTable.hashes()[i].feedback;
    await gradebook.waitForElementVisibility(`editGradeButton`, `${row}_${column}`)
    await gradebook.click(`editGradeButton`, `${row}_${column}`)
    await gradebook.populate('gradeEditGradeOverride', grade);
    await gradebook.populate('editGradeComment', feedback);
    await coursePages.gradebook.click('save', 'Save');
    await coursePages.home.click('closeAlert');
  }
  await sleep(2000);
});

When(/^I confirm assigned assignment "(.*)" is in my gradebook$/, async function (assignmentName) {
  await gradebook.assertTextIncludes('studentGradebook', assignmentName);
});

When(/^I confirm unassigned assignment "(.*)" is not in my gradebook$/, async function (assignmentName) {
  await gradebook.assertTextDoesNotInclude('studentGradebook', assignmentName);
});

When(/^I update category "(.*)" to drop "(.*)" grades$/, async function (categoryName, droppedGrades) {
  await gradebook.click('settingsNav');
  await gradebook.waitForElementVisibility('dropGradeDropdown');
  await gradebook.populate('dropGradeDropdown', droppedGrades);
  await gradebook.click('save', 'Save');
});

When('Instructor filters on the last 7 days', async function () {
  await filter.waitClick('showFilters');
  await filter.waitClick('showDateRange');
  await filter.waitClick('lastSevenDays');
  await filter.waitClick('applyFilters');
});
