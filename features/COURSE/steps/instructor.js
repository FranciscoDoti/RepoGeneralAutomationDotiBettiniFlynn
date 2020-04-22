const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver.js`);
const {sleep } = require(`${process.cwd()}/app/driver`);
const { randomURLDisplayName } = require(`${process.cwd()}/features/COURSE/helpers/dataGenerator`);

When(/^I activate "(.*)" course with following data$/, async function (courseName, data_table) {
  await pages.courseList.click('courseTemplate', 'COURSES');
  await pages.courseList.click('courseMenu', courseName);
  await pages.editCourse.click('editCourse');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value);
    } else {
      await pages.createCourse.populate('selectDay', data_table.hashes()[i].value);
    }
  }
  await pages.courseList.click('endDate');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('selectDate', '15');
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});


When(/^I add the activities in courseplanner to "(.*)" course$/, async function (courseName, data_table) {
  await sleep(1000);
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Browse');
  for (let i = 0; i < data_table.rows().length; i++) {
    let tActivity = data_table.hashes()[i].activity == "randomURLDisplayName" ? randomURLDisplayName : data_table.hashes()[i].activity;
    await pages.coursePlanner.populate('librarySearchInput', tActivity);
    await pages.coursePlanner.click('addAssignmentButton', tActivity);
  }
});

When('I assign the activities in courseplanner', async function (data_table) {
  await pages.coursePage.click('navigation', 'My Course');
  await pages.coursePage.click('Tab', 'COURSE PLAN')
  for (let i = 0; i < data_table.rows().length; i++) {
    let Elements = await pages.coursePlanner.getWebElements('assignAssignmentButton');
    let countlinks = Elements.length;
    let x = countlinks - 1;
    while (x >= 0) {
      x--;
      await pages.coursePlanner.click('assignAssignmentButton');
      await pages.coursePlanner.click('assignToStudents');
      await pages.coursePlanner.populate('pointsInput', data_table.hashes()[i].Points);
      await pages.coursePlanner.click('assignButton');
      await pages.home.click('closeAlert');
      break;
    }
  }
});

When('I create Course Template by coping from {string} template', async function (string) {
  await pages.createCourse.click('createCourseButton');
  await pages.createCourse.click('template');
  await pages.createCourse.click('selectedTemplateBtn');
});

When(/^Instructor copy course from the "(.*)" template with the following data$/, async function (courseName, data_table) {
/*  await pages.courseList.click('courseMenu', courseName);
  await pages.copyCourse.click('copyCourse'); */
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.copyCourse.click('save');
  await pages.home.click('closeAlert');
});




Then(/^I verify that "(.*)" is assigned to "(.*)"$/, async function (courseName, userType){
  let user = this.users[userType];
  await pages.home.click('signInLocal', 'SIGN IN');
  await pages.home.populate('username', user.username);
  await pages.home.populate('password', user.password);
  await pages.home.click('signIn');
  await pages.createCourse.assertElementExists('courseCard', courseName);

});

Then('I verify that activities are assigned', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertTextIncludes('assignmentStatus', data_table.hashes()[i].activity, data_table.hashes()[i].Status)
  }
});

When(/^I add URL link to "(.*)" in coursePlanner$/, async function (courseName, data_table){
  await pages.coursePage.click('navigation','Browse');
  await pages.coursePage.click('Tab', 'MY CONTENT');
  await pages.coursePlanner.click('customContentButton','New');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('urlLink');
    await pages.resources.populate(data_table.hashes()[i].field, data_table.hashes()[i].link)
    await pages.resources.click('addUrlLink');
  }
});

When('I add URL in courseplanner', async function (data_table){
  await pages.resources.click('goToContent');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('addCustomActivity', data_table.hashes()[i].activity);
  }
});

Then('I verify that activties are added in courseplanner', async function (data_table){
  await pages.coursePage.click('navigation', 'My Course');
  await pages.coursePage.click('Tab', 'COURSE PLAN');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertElementExists('activityName', data_table.hashes()[i].activity)
  }
});

When(/^I create a course "(.*)" with the following data$/, async function (courseName, data_table){
await pages.courseList.click('courseMenu', courseName);
await pages.copyCourse.click('copyCourse');
for (let i = 0; i < data_table.rows().length; i++) {
 await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i]. value)
}
await pages.copyCourse.click('save');
});

When('I click on {string}', async function (courseName){
  await pages.createCourse.click('courseCard', courseName);
})

When(/^I create Gradebook Category for student and assign that to "(.*)" activity$/, async function (activity, data_table) {
  await pages.coursePage.click('navigation','Gradebook');
  await pages.gradebook.click('gradebookSettings')
  await pages.gradebook.click('gradeBookCategory','Add Category');
  await sleep (500);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.scrollElementIntoView('categoryName')
    await pages.gradebook.populate('categoryName', data_table.hashes()[i].CategoryName)
    await pages.gradebook.populate('dropLowestGrade', data_table.hashes()[i].DropGrade);
    await pages.gradebook.click('save','Save');
    await sleep (500);
  }
  await pages.coursePage.click('navigation','My Course');
  await pages.coursePage.click('Tab', 'COURSE PLAN');
  let sActivity = data_table.hashes()[i].activity == "randomURLDisplayName" ? randomURLDisplayName : data_table.hashes()[i].activity;
  await pages.coursePlanner.click('assignGradebook', sActivity);
  await pages.coursePlanner.click('gradeBookCategory');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate('Category', data_table.hashes()[i].GradebookCategory)
    await pages.coursePlanner.click('assignButton');
  }
});

When(/^I edit student grade in "(.*)"$/, async function (courseName,data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = this.users[data_table.hashes()[i].Students];
  await pages.gradebook.click('editTotal',user.firstName)
  await pages.gradebook.populate('editGrade', data_table.hashes()[i].editGrade);
  await pages.gradebook.click('save', 'Save');
    }
});

Then('I verify the Grades', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = this.users[data_table.hashes()[i].Students];
    await pages.gradebook.assertTextIncludes('courseTotal', user.lastName, data_table.hashes()[i].CourseTotal);
    await pages.gradebook.assertTextIncludes('studentcourseTotal', user.lastName, data_table.hashes()[i].Google);
    await pages.gradebook.assertTextIncludes('studentCategoryTotal', user.lastName, data_table.hashes()[i].CategoryTotal)
  }
});

When(/^I add "(.*)" content first in order to continue adding the rest contentfrom Browse to courseplanner in "(.*)"$/, async function (activity, courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Browse');
  await pages.coursePlanner.populate('librarySearchInput', activity);
  await pages.coursePlanner.click('addAssignmentButton', activity);
  await pages.coursePlanner.click('addingContent');
  await pages.coursePlanner.click('continue');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignmentButton', data_table.hashes()[i].activity);
  }
})

When(/^I create "(.*)" writing activity as an instructor$/, async function (writingName){
  await pages.home.click('closeAlert');
  await driver.getDriver().navigate().refresh();
  await pages.coursePage.click('navigation','Browse');
  await pages.coursePage.click('Tab', 'MY CONTENT');
  await pages.coursePlanner.click('customContentButton', 'New');
  await pages.resources.click('writingPrompt');
  await pages.coursePlanner.click('editTitle');
  await pages.coursePlanner.populate('activityTitle', writingName);
  await pages.coursePlanner.click('TitleSave');
  await pages.coursePlanner.click('close');
})

Then(/^I verify that "(.*)" writing activity is added in Browse$/, async function (activityName){
  await pages.coursePage.click('Tab', 'MY CONTENT');
  await pages.coursePlanner.assertElementExists('activityName', activityName);
});

When('I add custom content courseplanner', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('addCustomActivity', data_table.hashes()[i].activity);
  }
});

Then('I drop', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = this.users[data_table.hashes()[i].Students];
    await pages.coursePage.click('navigation','People');
    await pages.people.populate('searchbox', user.username);
    await pages.people.click('checkbox', user.username);
    await pages.people.click('button', 'Drop Students');
    await pages.people.click('button', 'Yes, Drop');
  }
});

When('I navigate to gradebook and verify grades', async function (data_table) {
  await pages.coursePage.click('navigation','My Course');
  await pages.gradebook.assertText('checkActivityCompletion', data_table.hashes()[0].activity, data_table.hashes()[0].percent)
});

When(/^I create a single course from "(.*)" with following data$/, async function (courseName, data_table){
  await pages.createCourse.click('createNewCourse');
  await pages.masterSection.click('selectTemplate', courseName);
  await pages.masterSection.waitForElementVisibility('createSingleCourse')
  await pages.masterSection.click('createSingleCourse');
  await pages.masterSection.click('buttonToCreateCourse','Next: Set course info')
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.masterSection.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
  }
  await pages.masterSection.click('courseEndDate');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('selectDate', '15');
  await pages.masterSection.click('buttonToCreateCourse', 'Next: Create Course');

})

Then(/^I verify that "(.*)" is created$/, async function(courseName){
  await sleep (500);
  this.data.set('course', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
})

When('I create a custom assessment task with following data', async function (data_table){
  await pages.coursePage.click('navigation','Browse');
  await pages.coursePage.click('Tab', 'MY CONTENT');
  await pages.coursePlanner.click('customContentButton', 'New');
  await pages.coursePlanner.click('assessmentButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    var a = data_table.hashes()[i];
    await pages.coursePlanner.populate('ProvideATitle', a.assessmentTitle);
    await pages.coursePlanner.populate('dropDown', 'Choose an assignment type', a.assessmentType);
    await pages.coursePlanner.populate('dropDown', 'Choose a taxonomy', a.homeTaxonomy);

  }
  await pages.coursePlanner.click('resetModel');
  await pages.coursePlanner.click('questionBank');
  await pages.coursePlanner.click('expandCollapse', 'Expand');
  await pages.coursePlanner.click('checkBoxAssignment');
  await pages.coursePlanner.click('addQuestionButton');
  await pages.coursePlanner.click('expandCollapse', 'Collapse')
  await pages.coursePlanner.click('close');
});

Then(/^I verify that custom content task is added in "(.*)" tab$/, async function (tabName, data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePage.click('Tab', tabName);
    await pages.coursePlanner.assertElementExists('addCustomActivity', data_table.hashes()[i].activity );
  }
})

When(/^I add activities in "(.*)" courseplanner tab$/, async function (courseName, data_table){
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Browse');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignmentButton', data_table.hashes()[i].activity);

  }
});

When(/^I create a Master Section from "(.*)" with following data$/, async function (courseName, data_table){
  await pages.createCourse.click('createNewCourse');
  await pages.masterSection.click('selectTemplate', courseName);
  await pages.masterSection.waitForElementVisibility('createMasterSection');
  await pages.masterSection.click('createMasterSection');
  await pages.masterSection.click('buttonToCreateCourse','Next: Set course info');
  for (let i = 0; i < data_table.rows().length; i++) {

    await pages.masterSection.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
  }
  await pages.masterSection.click('courseEndDate');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('selectDate', '15');
  await pages.masterSection.click('fullAccess');
  await pages.masterSection.click('buttonToCreateCourse', 'Next: Create Master Section');
  await pages.home.click('closeAlert');
});

Then('I verify that I created a Master Section with following data', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = this.users[data_table.hashes()[i].InstructorName];
    var c = data_table.hashes()[i];
    this.data.set('course', c.courseNameMS);
    await pages.masterSection.assertElementExists('courseNameMS', c.courseNameMS);
    await pages.masterSection.assertTextIncludes('Status', c.Status);
    console.log(user.firstName+" "+user.lastName)
    await pages.masterSection.assertTextIncludes('instructorMS', user.firstName+" "+user.lastName);
    await pages.masterSection.assertTextIncludes('masterSectionCode', c.MasterCode);
  }
});

When('I click on master card', async function (){
  await pages.masterSection.click('masterCard')
})

When(/^I copy the "(.*)" course from the Master Section$/, async function (sectionName, data_table){
  await pages.masterSection.click('courseMenuButton', sectionName)
  this.data.set('section', sectionName);
  await pages.masterSection.click('copyMasterSection')
  await pages.masterSection.click('createSingleCourse')
  await pages.masterSection.click('buttonToCreateCourse','Next: Set course info');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.masterSection.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
  }
  await pages.masterSection.click('courseEndDate');
  await pages.courseList.click('nextMonthButton');
  await pages.courseList.click('selectDate', '15');
  await pages.masterSection.click('buttonToCreateCourse', 'Next: Create Course');
})

Then(/^I verify that the course "(.*)" is created$/,async function (courseName){
  await pages.coursePage.click('tab', 'MASTER SECTIONS')
  await pages.coursePage.click('tab', 'COURSES')
  await pages.masterSection.assertElementExists('MasterCourse', courseName)
})
When(/^I add the activities by searching in browse and adding it to courseplanner in "(.*)" course$/, async function(courseName,data_table){
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Browse');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activities);
    await pages.coursePlanner.click('addAssignmentButton', data_table.hashes()[i].addContent);
    // if(i===0) {
    //   await pages.coursePlanner.click('addingContent');
    //   await pages.coursePlanner.click('continue');
    //   await pages.home.click('closeAlert');
    // }
  }
})
When(/^I verify that the side menu exist in "(.*)"$/, async function(courseName){
  await pages.coursePage.click('tab', 'COURSES')
  await pages.createCourse.assertElementExists('courseCard', courseName)
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.assertElementExists('navigation','My Course');
  await pages.coursePage.assertElementExists('navigation','Browse');
  await pages.coursePage.assertElementExists('navigation','Gradebook');
  await pages.coursePage.assertElementExists('navigation','People');
  if(courseName != 'Read & Practice Course'){
    await pages.coursePage.assertElementExists('navigation','Reports');
    await pages.coursePage.assertElementExists('navigation','E-book');
  }
});
