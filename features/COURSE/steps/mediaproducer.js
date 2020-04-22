const {When, Then} = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const {sleep} = require(`${process.cwd()}/app/driver`);
const { randomURLDisplayName } = require(`${process.cwd()}/features/COURSE/helpers/dataGenerator`);

When(/^I create Course Template with ISBN "(.*)" and course code "(.*)"$/, async function (number, code, data_table) {
  this.data.set('code', code);
  this.data.set('Number', number);
  await sleep(500);
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
  await sleep(500);
  await pages.courseList.click('courseMenu', courseName);
  await pages.editCourse.click('editCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    await pages.editCourse.populate('courseName', c.courseName)
    await pages.editCourse.populate('courseCode', c.courseCode)
    await pages.editCourse.populate('templateStatus', c.templateStatus)
  }
  await pages.editCourse.click('save');
});

When(/^I add the activities in resources to "(.*)" template$/, async function (courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation', 'Resources');
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
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseMenuTemplate', courseName);
  await sleep(500);
  await pages.coursePage.click('courseMenuTemplate')
  await pages.copyCourse.click('copyCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    this.data.set('code', c.courseCode);
    this.data.set('courseName', c.courseName);
    await pages.copyCourse.populate('courseName', c.courseName)
    await pages.copyCourse.populate('courseCode', c.courseCode)
  };
  await pages.copyCourse.click('save');
  await pages.home.click('closeAlert');
});

Then(/^I verify that "(.*)" message is displayed$/, async function (message) {
  let Message = this.data.get('Name');
  let alertMessage = Message + ' ' + message
  await pages.home.assertTextIncludes('alert', alertMessage);
});

Then(/^I verify that complete icon is displayed$/, async function () {
    await pages.home.assertElementExists('completed-icon');
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
  await pages.coursePage.click('tab', coursePage);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('addUnit');
    await pages.coursePlanner.populate('addUnitName', data_table.hashes()[i].folders);
    await pages.coursePlanner.click('parentFolder')
    await pages.coursePlanner.click('addUnitButton');
    await pages.eBook.populate('contentCheckbox', data_table.hashes()[i].activity, 'check');
    await pages.eBook.populate('contentCheckbox', data_table.hashes()[i].activity, 'check');
    await pages.eBook.click('activitySelected', 'Move');
    await pages.eBook.click('Folder', data_table.hashes()[i].folderName);
    await pages.resources.click('placeInFolder');
    await pages.home.click('closeAlert');
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
  await sleep(500);
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
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await pages.courseList.populate('search', courseName);
  await sleep(500);
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
Then(/^I verify that activties are added in "(.*)"$/, async function (tabName, data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePage.click('navigation', tabName);
    let activity = data_table.hashes()[i].activity == "randomURLDisplayName" ? randomURLDisplayName : data_table.hashes()[i].activity;
    await pages.eBook.assertElementExists('activityVerification', activity);
  }
});

When(/^I create Custom Assesment Task in "(.*)" Tab$/, async function (tabName, data_table) {
  await pages.coursePage.click('navigation', tabName);
  await pages.createCourse.click('New');
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

When('I add the activities in ebook', async function (data_table) {
  await pages.coursePage.click('navigation', 'E-book');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.click('yourContent');
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('addAssignment', data_table.hashes()[i].activity);
    await pages.coursePlanner.click('closeCourseplanner')
  }
});
When('I create template with following data', async function (data_table) {
  await pages.createCourse.click('plusButton');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    let randomName = Math.floor(Math.random() * 100) + 'Template'
    let randomNumber = Math.floor(Math.random() * 10000000000000)
    c.courseName = randomName
    c.isbnNumber = randomNumber
    this.data.set('Name', c.courseName);
    this.data.set('code', c.courseCode);
    this.data.set('Number', c.isbnNumber);
    await pages.createCourse.assertElementExists('courseType');
    await pages.createCourse.populate('courseType', c.courseType)
    await pages.createCourse.assertElementExists('productModel');
    await pages.createCourse.populate('productModel', c.productModel)
    await pages.createCourse.assertElementExists('courseName');
    await pages.createCourse.populate('courseName', c.courseName)
    await pages.createCourse.assertElementExists('courseCode');
    await pages.createCourse.populate('courseCode', c.courseCode)
    if (c.learningObjective != '') {
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

When('I reorder the resources on template in ebook', async function (data_table) {
  await pages.coursePlanner.click('actionButtonValidation');
  await pages.coursePlanner.click('reorder');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('reorderResources', data_table.hashes()[i].actvities);
    await pages.resources.click(data_table.hashes()[i].reorder);
  }
  await pages.coursePlanner.click('modalSaveButton');
});

When(/^I create "(.*)" custom activity in "(.*)" tab$/, async function (activityName, tabName) {
  await pages.coursePage.click('navigation', tabName);
  await pages.createCourse.click('New');
  await pages.resources.click('writingPrompt');
  await pages.coursePlanner.click('editTitle');
  await pages.coursePlanner.populate('activityTitle', activityName);
  await pages.coursePlanner.click('TitleSave');
  await pages.coursePlanner.click('close');

});

When('I add custom activity to Content Library', async function (data_table) {
  await pages.coursePage.click('navigation', 'Create');
  for (let i = 0; i < data_table.rows().length; i++) {
    let activity = data_table.hashes()[i].activity == "randomURLDisplayName" ? randomURLDisplayName : data_table.hashes()[i].activity;
    await pages.createCourse.click('customContentAdd', activity);
  }
})

When(/^I create a custom assesment activity$/, async function (data_table) {
  await pages.coursePage.click('navigation', 'Create');
  for (let i = 0; i < data_table.rows().length; i++) {
    var a = data_table.hashes()[i];
    await pages.createCourse.click('New');
    await pages.coursePlanner.click('assessmentButton');
    await pages.coursePlanner.populate('ProvideATitle', a.assessmentTitle);
    await pages.coursePlanner.populate('dropDown', 'Choose an assignment type', a.assessmentType);
    await pages.coursePlanner.populate('dropDown', 'Choose a taxonomy', a.homeTaxonomy);
    await pages.coursePlanner.click('save');
  }
  await pages.coursePlanner.click('close');
});

When(/^I add "(.*)" to the Course Library$/, async function (activityName) {
  await pages.coursePlanner.click('addToLibrary', activityName);
  await pages.coursePage.click('navigation', 'Content Library');
});

When(/^I add "(.*)" to the course plan$/, async function (activityName) {
  await pages.coursePlanner.click('addToBtn', activityName);
  await pages.coursePlanner.click('coursePlan');
  await pages.coursePage.click('navigation', 'Course Plan');
  await pages.coursePlanner.assertElementExists('activityLink', activityName);
});

When(/^I add activities by "(.*)" and add to content library$/, async function (tab, data_table) {
  await pages.coursePage.click('navigation', tab);
  await pages.coursePage.click('contentType', 'Keyword Search');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activities);
    await pages.coursePlanner.click('librarySearchInput');
    await pages.resources.click('addResources', data_table.hashes()[i].addContent);
  }
});
When(/^I click on "(.*)" tab and verify the checkboxes with the following data$/, async function (activityName, data_table) {
  await pages.coursePlanner.click('activityLink', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    var s = data_table.hashes()[i];
    if (activityName === 'ISBN') {
      await pages.coursePlanner.populate('search', 'Search by ISBN', s.ISBN);
      await pages.coursePlanner.click('filterCheckbox', s.ISBN);
    } else if (activityName == 'Author') {
      await pages.coursePlanner.populate('search', 'Search by Author', s.Author);
      await pages.coursePlanner.click('filterCheckbox', s.Author);
    } else if (activityName == 'Project Title') {
      await pages.coursePlanner.populate('search', 'Search by Project Title', s.projectTitle);
      await pages.coursePlanner.click('filterCheckbox', s.projectTitle);
    }
    await pages.coursePlanner.click('Apply')
    await pages.coursePlanner.click('contentCheckbox');
  }
});

When(/^I create folder and add the activities to the folder in "(.*)" in Production Tool$/, async function (tabName, data_table) {
  await pages.coursePage.click('navigation', tabName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addFolder')
    await pages.resources.populate('folderName', data_table.hashes()[i].Folder);
    await pages.resources.click('addFolderButton');
    await pages.eBook.click('actionButton', data_table.hashes()[i].activities);
    await pages.coursePlanner.click('actionMoveItemToFolder');
    await pages.eBook.click('Folder', data_table.hashes()[i].PlaceFolder);
    await pages.resources.click('placeInFolder');
    await pages.home.click('closeAlert');
  }
})

When('I Reorder The folders in Production Tab', async function (data_table) {
  await pages.coursePlanner.click('actionButtonValidation');
  await pages.coursePlanner.click('unitActionItemsReorder');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('reorderResources', data_table.hashes()[i].Folder);
    await pages.resources.click(data_table.hashes()[i].Button);
  }
  await pages.coursePlanner.click('modalSaveButton');
})

When('I delete the folder in Production Tab', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.eBook.click('actionButton', data_table.hashes()[i].Folder);
    await pages.coursePlanner.click('removeFolderAction');
    await pages.coursePlanner.click('removeFolderButton')
  }
});


Then('I verify that template is created with following data', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];

    let courseName = this.data.get('Name');
    let isbNmuber = this.data.get('Number');
    await pages.home.click('closeAlert');
    await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
    await pages.courseList.populate('search', courseName)
    await pages.courseList.assertTextIncludes('courseStatus',courseName, c.status);
    await pages.courseList.assertElementExists('courseName', courseName);
    await pages.courseList.assertTextIncludes('ISBN', courseName, 'ISBN:'+ isbNmuber)
  }
})