const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const _ = require('lodash');

When('I create Course Template with the data', async function (data_table) {
  await pages.createCourse.click('plusButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.createCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value)
    } else {
      await pages.createCourse.click('selectDay', data_table.hashes()[i].value);
    }
  }

  await pages.createCourse.click('save');
});

When(/^I activate the "(.*)" template and add the following data$/, async function (courseName, data_table) {
  await pages.courseList.click('courseMenu', courseName);
  await pages.editCourse.click('editCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.editCourse.assertElementExists(data_table.hashes()[i].field)
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.editCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value);
    } else {
      await pages.createCourse.click('selectDay', data_table.hashes()[i].value);
    }
  }
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});

When(/^I add the activities in resources to "(.*)" template$/, async function (courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('resources');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addContent');
    await pages.resources.populate('searchBar', data_table.hashes()[i].activity);
    await pages.resources.click(data_table.hashes()[i].type, data_table.hashes()[i].activity);
    await pages.resources.click('closeResourceSearchNav');
  }
});

When(/^I copy course from the "(.*)" template with the following data$/, async function (courseName, data_table) {
  await pages.courseList.click('courseMenu', courseName);
  await pages.copyCourse.click('copyCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.copyCourse.populate(data_table.hashes()[i].field, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.copyCourse.click('save');
  await pages.home.click('closeAlert');
});

Then(/^I verify that "(.*)" message is displayed$/, async function (message) {
  await pages.home.assertTextIncludes('alert', message);
});

Then(/^I verify that "(.*)" has created with following "(.*)" number$/, async function (courseName, verifyNumber) {
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('ISBNVerification', courseName);
  await pages.createCourse.assertTextIncludes('ISBNVerification', courseName, verifyNumber);
  await pages.home.click('closeAlert');
});

When(/^I create "(.*)" with the data$/, async function (courseName, data_table) {
  await pages.createCourse.assertElementExists('createCourseButton');
  await pages.createCourse.click('createCourseButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
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
    await pages.home.assertTextIncludes('alert', data_table.hashes()[i].message)
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
    await pages.home.assertTextIncludes('alert', data_table.hashes()[i].message)
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

When(/^I add the activities in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click(coursePage);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('customContentButton');
    await pages.coursePlanner.click('libraryTab');
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignmentButton', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('closeCourseplanner');
  }
});

When(/^I add the activities to respective folders in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click(coursePage);
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
  await pages.coursePage.click(coursePage);
  await pages.coursePlanner.click('actionButtonValidation');
  await pages.coursePlanner.click('reorder');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('reorderResources', data_table.hashes()[i].actvities);
    await pages.resources.click(data_table.hashes()[i].reorder);
  }
  await pages.coursePlanner.click('modalSaveButton');
});

Then(/^I verify the activities are added in folders which are present in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click(coursePage);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('folderName', data_table.hashes()[i].folders);
    await pages.coursePlanner.assertElementExists('activityName', data_table.hashes()[i].activity)
  }
});

When(/^I delete the resources from the Template in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click(coursePage);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('actionButtonResources', data_table.hashes()[i].folders);
    await pages.coursePlanner.click('actionRemoveItem');
    await pages.resources.click('confirmRemoveItem');
    await pages.home.assertTextIncludes('alert', data_table.hashes()[i].message)
  }
});

Then(/I verify that resources are deleted from Template in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click(coursePage);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.assertElementDoesNotExist('actionButton', data_table.hashes()[i].folders);
  }
});

Then(/^I verify that resources are reordered in "(.*)"$/, async function (coursePage, data_table) {
  await pages.coursePage.click(coursePage);
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
    await pages.home.assertTextIncludes('alert', data_table.hashes()[i].message);
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

When(/I add "(.*)" as collaborator to "(.*)"$/, async function (user, courseName) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.home.click('achieveHome');
  await pages.courseList.click('courseCard', courseName);
  await pages.createCourse.click('shareTemplate');
  await pages.createCourse.populate('collaboratorsEmail', payload.username);
  await pages.createCourse.click('addCollaborators');
  await pages.createCourse.click('closeCollaboratorModal');
});

Then('I verify that activties are added', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.assertElementExists('assignmentValidation', data_table.hashes()[i].activity);
  }
})
Then('I verify that custom activity is present in courseplanner your content section', async function (data_table) {

});
