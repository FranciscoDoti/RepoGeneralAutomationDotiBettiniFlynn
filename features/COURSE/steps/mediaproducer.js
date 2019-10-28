const { Given, When,Then} = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const {sleep } = require(`${process.cwd()}/app/driver`);

When(/^I create Course Template with ISBN "(.*)" and course code "(.*)"$/, async function (number, code, data_table) {
  this.data.set('code', code);
  this.data.set('Number', number);
  await pages.createCourse.click('plusButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.createCourse.assertElementExists(data_table.hashes()[i].field)
      await pages.createCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.createCourse.click('selectDay', data_table.hashes()[i].value);
    }
  }

  await pages.createCourse.click('save');
});

When(/^I activate the "(.*)" template and add the following data$/, async function (courseName, data_table) {
  await pages.home.click('closeAlert');
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await pages.courseList.click('courseMenu', courseName);
  await pages.editCourse.click('editCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    await pages.editCourse.populate('courseName', c.courseName)
    await pages.editCourse.populate('courseCode', c.courseCode)
    await pages.editCourse.populate('templateStatus', c.templateStatus)
  }
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});

When(/^I add the activities in resources to "(.*)" template$/, async function (courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Resources');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addContent');
    await pages.resources.populate('searchBar', data_table.hashes()[i].activity);
    await pages.resources.assertElementExists(data_table.hashes()[i].type, data_table.hashes()[i].activity)
    await pages.resources.scrollElementIntoView(data_table.hashes()[i].type, data_table.hashes()[i].activity);
    await pages.resources.click(data_table.hashes()[i].type, data_table.hashes()[i].activity);
    await pages.resources.click('closeResourceSearchNav');
  }
});

When(/^I copy course from the "(.*)" template with the following data$/, async function (courseName, data_table) {
  await pages.courseList.assertElementExists('courseMenu', courseName);
  await sleep(500);
  await pages.courseList.click('courseMenu', courseName);
  await pages.copyCourse.click('copyCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    await pages.copyCourse.populate('courseName', c.courseName)
    await pages.copyCourse.populate('courseCode', c.courseCode)
  };
  await pages.copyCourse.click('save');
  await pages.home.click('closeAlert');
});

Then(/^I verify that "(.*)" message is displayed$/, async function (message) {
  await pages.home.assertTextIncludes('alert', message);
});

Then(/^I verify that "(.*)" has created with following "(.*)" number$/, async function (courseName, verifyNumber) {
  await pages.home.click('closeAlert');
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES')
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('ISBNVerification', courseName);
  await pages.createCourse.assertTextIncludes('ISBNVerification', courseName, verifyNumber);
});

When(/^I create "(.*)" with ISBN "(.*)" and course code "(.*)"$/, async function (courseName, number, code, data_table) {
  this.data.set('code', code);
  this.data.set('course name', number);
  await pages.createCourse.assertElementExists('createCourseButton');
  await pages.createCourse.click('createCourseButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.createCourse.assertElementExists(data_table.hashes()[i].field)
      await pages.createCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.createCourse.click('selectDay', data_table.hashes()[i].value);
    }
  }
  await pages.createCourse.click('save');
});

When('I add folders in resource tab', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addFolder');
    await pages.resources.populate('folderName', data_table.hashes()[i].folders);
    await pages.resources.click('addFolderButton');
  }
});

When('I add the following activities to respective folders in resource tab', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addFolder');
    await pages.resources.populate('folderName', data_table.hashes()[i].folders);
    await pages.resources.click('addFolderButton');
    await pages.resources.click('threeButtonActivities', data_table.hashes()[i].activity);
    await pages.resources.click('moveItem');
    await pages.resources.click('moveItemToFolder', data_table.hashes()[i].folders);
    await pages.resources.click('placeInFolder');
    console.log(data_table.hashes()[i].message);
    await pages.home.assertTextIncludes('alert', data_table.hashes()[i].message)
    await pages.home.click('closeAlert');

  }
});
Then('I verify the following activities are present in folders', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('folderButton', data_table.hashes()[i].folders);
    await pages.resources.assertElementExists('assignmentValidation', data_table.hashes()[i].activity)
  }
});

When('I reorder the resources on template', async function (data_table) {
  await pages.resources.click('threeButtonValidation');
  await pages.resources.click('reorderItems');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('reorderResources', data_table.hashes()[i].folders);
    await pages.resources.click(data_table.hashes()[i].reorder);
  }
  await pages.coursePlanner.click('modalSaveButton');
});

When('I delete the following resources from the Template', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('threeButtonResources', data_table.hashes()[i].folders);
    await pages.resources.click('removeItem');
    await pages.resources.click('confirmRemoveItem');
  }
});

Then('I verify that the following resources are not present in the Template', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.assertElementDoesNotExist('threeButtonResources', data_table.hashes()[i].folders);
  }
});

Then('I verify that resources are reordered', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.assertTextIncludes('resourcesReorderVerification', data_table.hashes()[i].orderNumber, data_table.hashes()[i].folders);
  }
});

When(/^I add the activities to respective folders in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click('tab',coursePage);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('addUnit');
    await pages.coursePlanner.populate('addUnitName', data_table.hashes()[i].folders);
    await pages.coursePlanner.click('parentFolder');
    await pages.coursePlanner.click('addUnitButton');
    await pages.coursePlanner.click('actionButton', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('actionMoveItemToFolder');
    await pages.resources.click('moveItemToFolder', data_table.hashes()[i].folders);
    await pages.resources.click('placeInFolder');
    await pages.home.assertTextIncludes('alert', data_table.hashes()[i].message);
  }
});

When(/^I reorder the resources on template in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click('navigation', 'My Course')
  await pages.coursePage.click('tab', coursePage);
  await pages.coursePlanner.click('actionButtonValidation');
  await pages.coursePlanner.click('reorder');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('reorderResources', data_table.hashes()[i].actvities);
    await pages.resources.click(data_table.hashes()[i].reorder);
  }
  await pages.coursePlanner.click('modalSaveButton');
});

Then(/^I verify the activities are added in folders which are present in "(.*)"$/, async function (coursePage, data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('folderName', data_table.hashes()[i].folders);
    await pages.coursePlanner.assertElementExists('activityName', data_table.hashes()[i].activity)
  }
});

When(/^I delete the resources from the Template in "(.*)"$/, async function (coursePage, data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('actionButtonResources', data_table.hashes()[i].folders);
    await pages.coursePlanner.click('actionRemoveItem');
    await pages.resources.click('confirmRemoveItem');

  }
});

Then(/^I verify that resources are deleted from Template in "(.*)"$/, async function (coursePage, data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertElementDoesNotExist('actionButton', data_table.hashes()[i].folders);
  }
});

Then(/^I verify that resources are reordered in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click('tab', coursePage);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertTextIncludes('reorderValidation', data_table.hashes()[i].orderNumber, data_table.hashes()[i].activities);
  }
});

Then('I verify that resources are reordered in ebook', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.eBook.assertTextIncludes('reorderValidation', data_table.hashes()[i].orderNumber, data_table.hashes()[i].activities);
  }
});

When('I add the activities to respective folders in ebook', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('addUnit');
    await pages.coursePlanner.populate('addUnitName', data_table.hashes()[i].folders);
    await pages.coursePlanner.click('parentFolder');
    await pages.coursePlanner.click('addUnitButton');
    await pages.eBook.click('actionButton', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('actionMoveItemToFolder');
    await pages.resources.click('moveItemToFolder', data_table.hashes()[i].folders);
    await pages.resources.click('placeInFolder');
  }
});

When('I delete the resources from the Template in ebook', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.eBook.click('actionButtonResources', data_table.hashes()[i].folders);
    await pages.coursePlanner.click('actionRemoveItem');
    await pages.resources.click('confirmRemoveItem');
    await pages.home.assertTextIncludes('alert', data_table.hashes()[i].message)
  }
})

When(/I add "(.*)" as collaborator to "(.*)"$/, async function (userType, courseName) {
  let user = this.users[userType];
  await pages.home.assertElementExists('achieveHome');
  await pages.home.click('achieveHome');
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES')
  await pages.courseList.click('courseMenu', courseName);
  await pages.createCourse.click('shareTemplate');
  await pages.createCourse.populate('collaboratorsEmail', user.username);
  await pages.createCourse.click('addCollaborators');
  await pages.createCourse.click('closeCollaboratorModal');
});

Then('I verify that activties are added', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.assertElementExists('assignmentValidation', data_table.hashes()[i].activity);
  }
})
Then('I verify that custom activity is present in courseplanner your content section', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePage.click('navigation','Browse');
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignmentButton', data_table.hashes()[i].activity);
    await pages.coursePage.click('navigation', 'My Course');
    await pages.coursePage.click('tab', 'COURSE PLAN');
    await pages.coursePlanner.assertElementExists('activityName', data_table.hashes()[i].activity);

  }
});

When(/^I create Custom Task in "(.*)" and add it to resources$/, async function (courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName)
  await pages.coursePage.click('navigation','Resources');
  await pages.resources.click('addActivity');
  await pages.resources.click('createCustomActivity');
  await pages.coursePlanner.click('assessmentButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertElementExists(data_table.hashes()[i].activity, data_table.hashes()[i].value);
    await pages.coursePlanner.populate(data_table.hashes()[i].activity, data_table.hashes()[i].value);
  }
  await pages.coursePlanner.click('resetModel');
  await pages.coursePlanner.click('questionBank');
  await pages.coursePlanner.click('checkBoxAssignment');
  await pages.coursePlanner.click('addQuestionButton');
  await pages.coursePlanner.click('close');
});

Then('I verify that custom content is added to resources', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addContent');
    await pages.resources.populate('searchBar', data_table.hashes()[i].activity);
    await pages.resources.click('addCCButton', data_table.hashes()[i].activity);
    await pages.resources.assertElementExists('assignmentValidation', data_table.hashes()[i].activity);
  }
});

When(/^I create "(.*)" Custom Task in "(.*)" and add it to resources$/, async function (customName, courseName) {
  await pages.createCourse.click('courseCard', courseName)
  await pages.coursePage.click('navigation', 'Resources');
  await pages.resources.click('addActivity');
  await pages.resources.click('createCustomActivity');
  await pages.resources.click('writingPrompt');
  await pages.coursePlanner.click('editTitle');
  await pages.coursePlanner.populate('activityTitle', customName);
  await pages.coursePlanner.click('TitleSave');
  await pages.coursePlanner.click('close');
});

When('I add the activities in ebook', async function (data_table){
  await pages.coursePage.click('navigation','E-book');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('yourContent');
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignment', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('closeCourseplanner')
  }
});
When('I create template with following data', async function (data_table){
  await pages.createCourse.click('plusButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    this.data.set('code', c.courseCode);
    this.data.set('Number',c.isbnNumber);
      await pages.createCourse.assertElementExists('courseType');
      await pages.createCourse.populate('courseType', c.courseType)
      await pages.createCourse.assertElementExists('productModel');
      await pages.createCourse.populate('productModel', c.productModel)
      await pages.createCourse.assertElementExists('courseName');
      await pages.createCourse.populate('courseName', c.courseName)
      await pages.createCourse.assertElementExists('courseCode');
      await pages.createCourse.populate('courseCode', c.courseCode)
      if(c.learningObjective != ''){
      await pages.createCourse.assertElementExists('learningObjective');
      await pages.createCourse.waitForElementVisibility('learningObjective', c.learningObjective)
      await pages.createCourse.populate('learningObjective', c.learningObjective)
      }
      await pages.createCourse.assertElementExists('isbnNumber');
      await pages.createCourse.populate('isbnNumber', c.isbnNumber)
      await pages.createCourse.assertElementExists('courseStatus');
      await pages.createCourse.populate('courseStatus', c.courseStatus);
    }
    await pages.createCourse.click('save');
});

When('I reorder the resources on template in ebook', async function (data_table){
  await pages.coursePlanner.click('actionButtonValidation');
  await pages.coursePlanner.click('reorder');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('reorderResources', data_table.hashes()[i].actvities);
    await pages.resources.click(data_table.hashes()[i].reorder);
  }
  await pages.coursePlanner.click('modalSaveButton');
});

