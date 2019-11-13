const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const csvtojson = require('csvtojson');


When(/^I generate "(.*)" month length access code for "(.*)"$/, async function (number, courseName) {
    await pages.courseList.populate('search', courseName);
    await pages.createCourse.assertElementExists('courseCard', courseName);
    await pages.createCourse.click('courseCard', courseName);
    await pages.createCourse.assertElementExists('courseTitle', 'E2E 301: '+courseName )
    await pages.home.click('togglerMenu');
    await pages.adminMenu.click('admin');
    await pages.adminMenu.click('admin');
    await pages.adminMenu.click('checkAccount');
    await pages.adminMenu.click('generate', 'Generate Access Codes');
    await pages.adminMenu.click('exportList');
});

Then(/^I verify that access code is generated "(.*)"$/, async function (courseName, datatable) {
  let courseReport = `${this.downloadLocation}/achieveaccesscode_${courseName}.csv`;
  const data = await csvtojson().fromFile(courseReport);

  for (let i = 0; i < datatable.rows().length; i++) {
      expect(data[0]).to.have.property(datatable.hashes()[i].Value);
  }
})

When(/^I check Access Code of "(.*)"$/, async function (courseName) {
    let courseReport = `${this.downloadLocation}/achieveaccesscode_${courseName}.csv`;
    const data = await csvtojson().fromFile(courseReport);
    await pages.adminMenu.click('closeExportList');
    await pages.home.click('achieveHome');
    await pages.home.click('togglerMenu');
    await pages.adminMenu.click('admin');
    await pages.adminMenu.click('checkAccessCode');
    await pages.adminMenu.populate('checkAccessCodeInput', data[0]["Access Code"]);
    await pages.adminMenu.click('SearchAccessCode');
})

Then(/^I verify that "(.*)" is displayed$/, async function (courseName) {
    await pages.adminMenu.assertTextIncludes('course', courseName);
    await pages.adminMenu.click('closeCheckAccessCode')
})

When(/^I update the access code for "(.*)"$/, async function (courseName, datatable){
    let courseReport = `${this.downloadLocation}/achieveaccesscode_${courseName}.csv`;
    for (let i = 0; i < datatable.rows().length; i++) {
    const data = await csvtojson().fromFile(courseReport);
    await pages.home.click('togglerMenu');
    await pages.adminMenu.click('admin');
    await pages.adminMenu.click('updateAccessCode');
    await pages.adminMenu.populate('updateAccessCodeInput', data[0]["Access Code"]);
    await pages.adminMenu.click('updateAccessCodeSearch');
    await pages.adminMenu.populate(datatable.hashes()[i].AccessCode, datatable.hashes()[i].Value);
    await pages.adminMenu.click('update');
    }
})