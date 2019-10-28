const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const csvtojson = require('csvtojson');
const driver = require(`${process.cwd()}/app/driver.js`);
const {sleep } = require(`${process.cwd()}/app/driver`);

When(/^I enroll the "(.*)" in "(.*)" course$/, async function (userType, courseName) {
  let user = this.users[userType];
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.createCourse.click('courseCard', courseName);
  await driver.getDriver().navigate().refresh();
  await pages.createCourse.assertElementExists('courseTitle', 'E2E 301: '+courseName )
  await pages.home.scrollElementIntoView('togglerMenu');
  await pages.home.assertElementExists('togglerMenu');
  await pages.home.click('togglerMenu');
  await pages.adminMenu.waitForElementVisibility('admin');
  await pages.adminMenu.assertElementExists('admin');
  await sleep (500);
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('manageEnrollments');
  await pages.adminMenu.populate('emailInput', user.username);
  await pages.adminMenu.click('addUserButton');
  await pages.home.click('');
  await pages.adminMenu.click('closeManageRoles');
});

When(/^I search for "(.*)" and click on course card$/, async function (courseName) {
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.createCourse.click('courseCard', courseName);
});

When('I click on Manage roles', async function () {
  await pages.home.assertElementExists('togglerMenu');
  await pages.home.click('togglerMenu');
  await pages.adminMenu.assertElementExists('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.waitForElementVisibility('manageRoles');
  await pages.adminMenu.assertElementExists('manageRoles');
  await pages.adminMenu.click('manageRoles')
});

Then('I verify Manage roles is displayed', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.adminMenu.assertElementExists(data_table.hashes()[i].field)
    await pages.adminMenu.assertElementDisabled(data_table.hashes()[i].disabled)
  }
});

When(/^I revoke "(.*)" of "(.*)"$/, async function (roles, userType) {
  let user = this.users[userType];
  await pages.adminMenu.populate('manageRolesEmailInput', user.username);
  await pages.adminMenu.populate('chooseRole', roles);
  await pages.adminMenu.click('revokeRole');
  await pages.home.click('closeAlert');
});

When(/^I grant "(.*)" to the "(.*)"$/, async function (roles, userType) {
  let user = this.users[userType];
  await pages.adminMenu.populate('manageRolesEmailInput', user.username);
  await pages.adminMenu.populate('chooseRole', roles);
  await pages.adminMenu.click('grantRole');
});

Then(/^I verify the message for each "(.*)"$/, async function (message) {
  await pages.home.assertTextIncludes('alert', message);
});

When('I generate and export course report', async function (){
  await pages.home.click('togglerMenu');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('courseReport');
  await pages.adminMenu.click('generateReport')
  await pages.adminMenu.click('exportReport');
});

Then('I verify the report is dowloaded with following data', async function (data_table) {
  const current = new Date();
  let month = current.getDate();
  let courseReport = `${this.downloadLocation}/course_report_${current.toString().split(' ')[1]}-${month<10?("0"+month):(month)}-${current.getFullYear()}.csv`;
  const data = await csvtojson().fromFile(courseReport);
  for (let i = 0; i < data_table.rows().length; i++) {
      expect(data[0]).to.have.property(data_table.hashes()[i].ColumnName);
  }
});


When(/^I click on "(.*)" Tab$/, async function (tabName){
  await pages.coursePage.click('navigation', tabName);
});

Then('I verify that following Tab are present', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePage.assertElementExists('Tab', data_table.hashes()[i].Tabs)
  }
})

When(/^I click on "(.*)" card$/, async function (courseName){
  await pages.createCourse.click('courseCard', courseName)
});

When(/^I add activities to "(.*)"$/, async function (tab, data_table){
  await pages.coursePage.click('navigation', 'Search');
  await pages.coursePage.click('contentType', 'Keyword Search');
  for (let i = 0; i < data_table.rows().length; i++) {
  await pages.coursePlanner.populate('librarySearchInput', data_table.hashes()[i].activities);
  await pages.coursePlanner.click('librarySearchInput');
  await pages.resources.click('addResources',data_table.hashes()[i].activities);
  }
});

When(/^I add the activities in "(.*)"$/, async function (tab, data_table){
await pages.coursePage.click('navigation', 'Content Library');
for (let i = 0; i < data_table.rows().length; i++) {
  await pages.resources.click('addButton', data_table.hashes()[i].activities);
  await pages.resources.click('placeTab', '2');
  }
})

Then(/^I verify that activities are added in "(.*)" and not in "(.*)"$/, async function (ebook, courseplan, data_table){
for (let i = 0; i < data_table.rows().length; i++) {
  await pages.coursePage.click('navigation', ebook);
  await pages.eBook.assertElementExists('activityVerification', data_table.hashes()[i].activities);
  await pages.coursePage.click('Tab', courseplan);
  await pages.eBook.assertElementDoesNotExist('activityVerification', data_table.hashes()[i].activities);
}
});

When(/^I add activities in "(.*)"$/, async function (tab, data_table){
  await pages.coursePage.click('navigation', 'Content Library');
for (let i = 0; i < data_table.rows().length; i++) {
  await pages.resources.click('addButton', data_table.hashes()[i].activities);
  await pages.resources.click('placeTab', '1');
  }
})

Then('I verify that activities are added in CoursePlan and not in eBook', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePage.click('Tab', 'Course Plan');
    await pages.eBook.assertElementExists('activityVerification', data_table.hashes()[i].activities);
    await pages.coursePage.click('navigation', 'E-book');
    await pages.eBook.assertElementDoesNotExist('activityVerification', data_table.hashes()[i].activities);
}
});

When(/^I add the activities in both "(.*)" and "(.*)"$/, async function (courseplan, ebook, data_table){
  await pages.coursePage.click('navigation', 'Content Library');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addButton', data_table.hashes()[i].activities);
    await pages.coursePage.click(data_table.hashes()[i].tab);
    }
})

Then(/^I verify that activities are added both in "(.*)" and "(.*)"$/, async function (courseplan, ebook, data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePage.click('navigation', courseplan);
    await pages.eBook.assertElementExists('activityVerification', data_table.hashes()[i].activities);
    await pages.coursePage.click('navigation', ebook);
    await pages.eBook.assertElementExists('activityVerification', data_table.hashes()[i].activities);
}
})

When('I create folder and add the activities to the folder in ebook', async function (data_table){
  await pages.coursePage.click('navigation', 'E-book');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('addFolder')
    await pages.resources.populate('folderName', data_table.hashes()[i].Folder);
    await pages.resources.click('addFolderButton');
    await pages.eBook.populate('contentCheckbox', data_table.hashes()[i].activities,'check');
    await pages.eBook.populate('contentCheckbox', data_table.hashes()[i].activities,'check');
    await pages.eBook.click('activitySelected', 'Move');
    await pages.eBook.click('Folder', data_table.hashes()[i].PlaceFolder);
    await pages.resources.click('placeInFolder');
    await pages.home.click('closeAlert');

  }
})

Then('I verify that activities are added to the folder in ebook', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.eBook.click('arrowUP', data_table.hashes()[i].Folder);
    await pages.eBook.assertElementExists('activityVerification', data_table.hashes()[i].activities);
    await pages.eBook.click('arrowDown', data_table.hashes()[i].Folder);
  }
})

When('I Reorder The folders in ebook', async function (data_table){
  await pages.eBook.populate('contentCheckbox', 'Reading 5','check');
  await pages.eBook.populate('contentCheckbox', 'Reading 5','check');
  await pages.eBook.click('activitySelected', 'Reorder');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('reorderResources', data_table.hashes()[i].Folder);
    await pages.resources.click(data_table.hashes()[i].Button);
  }
  await pages.coursePlanner.click('modalSaveButton');
})

Then('I verify that Folders are reordered in ebook', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.assertTextIncludes('resourcesReorderVerification', data_table.hashes()[i].orderNumber, data_table.hashes()[i].Folder);
  }
})

When('I delete the folder in ebook', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.eBook.populate('contentCheckbox', data_table.hashes()[i].Folder,'check');
    await pages.eBook.populate('contentCheckbox', data_table.hashes()[i].Folder,'check');
    await pages.eBook.click('activitySelected', 'Remove');
    await pages.coursePlanner.click('removeFolderButton')
  }
});

Then('I verify that Folders are deleted in ebook', async function(data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
  await pages.eBook.assertElementDoesNotExist('contentCheckbox', data_table.hashes()[i].Folder);
  }
})

Then(/^I verify that "(.*)" is deleted$/, async function (courseName){
  await driver.getDriver().navigate().refresh();
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementDoesNotExist('courseCard', courseName)

})