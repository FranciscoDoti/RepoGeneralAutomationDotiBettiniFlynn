// var { After, AfterAll } = require('cucumber');
// const _ = require('lodash');
// const urls = require(`${process.cwd()}/config/urls.json`);
// const { closeBrowser, resetBrowser, takeScreenshot, visitURL, config } = require(`${process.cwd()}/app/driver`);
// const asmtpages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
// const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
// const { sleep } = require(`${process.cwd()}/app/driver`);

// After(async function (scenario) {
//     await resetBrowser();
// });

// AfterAll(async function () {
//     await closeBrowser();
// });

// // Delete the newly created assessment
// After('@assessmentCreation', async function () {
//     await asmtpages.assignmentTab.click('course Name');
//     await asmtpages.assignmentTab.click('list Assessments', this.data.get('assessment_name'));
//     await asmtpages.assignmentTab.click('list Assessments Delete', this.data.get('assessment_name'));
//     await asmtpages.hatchlingItem.click('Submit Yes');
// });

// After('@admin-delete-course', async function () {
//     let url = await _.get(urls, ['Achieve-CW', this.stack]);
//     let user = this.users['admin_1'];
//     let courseName = this.data.get('courseName');
//     await resetBrowser();
//     await visitURL(url);
//     await pages.home.click('signInLocal');
//     await pages.home.populate('username', user.username);
//     await pages.home.populate('password', user.password);
//     await pages.home.click('signIn');
//     await pages.courseList.populate('search', courseName);
//     let courseElements = await pages.courseList.getWebElements('courseName', courseName);
//     for (let i = 0; i < courseElements.length; i++) {
//         await sleep(1000);
//         await pages.coursePage.click('courseMenu');
//         await pages.courseList.click('deleteCourse');
//         await pages.courseList.click('confirmDelete');
//         await pages.home.click('closeAlert');
//     }
// });

// After('@admin-delete-courseTemplate', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.stack]);
//   let user = this.users['admin_1'];
//   await resetBrowser();

//   await visitURL(url);
//   await pages.home.click('signInLocal');
//   await pages.home.populate('username', user.username);
//   await pages.home.populate('password', user.password);
//   await pages.home.click('signIn');

//   let course = this.data.get('code');
//   let courseName = this.data.get('Number');
//   await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
//   await pages.courseList.populate('search', courseName);
//   await pages.courseList.assertElementExists('courseNumber', course);
//   let elements = await pages.courseList.getWebElements('courseNumber', course);
//   for (let i = 0; i < elements.length; i++) {
//     await sleep(500);
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.assertElementExists('confirmDelete')
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//   }
// });

// After('@mediaeditor-delete-course', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.stack]);
//   let user = this.users['media_editor_1'];
//   await resetBrowser();

//   await visitURL(url);
//   await pages.home.click('signInLocal');
//   await pages.home.populate('username', user.username);
//   await pages.home.populate('password', user.password);
//   await pages.home.click('signIn');
//   let course = this.data.get('code');
//   let courseName = this.data.get('Number');
//   await pages.courseList.populate('search', courseName);
//   await pages.courseList.assertElementExists('courseNumber', course);
//   let elements = await pages.courseList.getWebElements('courseNumber', course);
//   for (let i = 0; i < elements.length; i++) {
//     await sleep(500);
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.assertElementExists('confirmDelete');
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//     break;
//   }
// });

// After('@customersupport-delete-course', async function () {
//     let url = await _.get(urls, ['Achieve-CW', this.stack]);
//     let user = this.users['customer_support_1'];
//     await resetBrowser();

//     await visitURL(url);
//     await pages.home.click('signInLocal');
//     await pages.home.populate('username', user.username);
//     await pages.home.populate('password', user.password);
//     await pages.home.click('signIn');

//     let course = this.data.get('code');
//     let courseName = this.data.get('Number');
//     await pages.courseList.populate('search', courseName);
//     await pages.courseList.assertElementExists('courseNumber', course);
//     let elements = await pages.courseList.getWebElements('courseNumber', course);
//     for (let i = 0; i < elements.length; i++) {
//         await sleep(500);
//         await pages.coursePage.click('courseMenu');
//         await pages.courseList.click('deleteCourse');
//         await pages.courseList.assertElementExists('confirmDelete')
//         await pages.courseList.click('confirmDelete');
//         await pages.home.click('closeAlert');
//     }
// });
// After('@mediaproducer-delete-courseTemplate', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.stack]);
//   let user = this.users['media_producer_2'];
//   await resetBrowser();
//   await visitURL(url);
//   await pages.home.click('signInLocal');
//   await pages.home.populate('username', user.username);
//   await pages.home.populate('password', user.password);
//   await pages.home.click('signIn')
//   let course = this.data.get('code');
//   let courseName = this.data.get('Number');
//   await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
//   await pages.courseList.populate('search', courseName);
//   await pages.courseList.assertElementExists('courseNumber', course);
//   let elements = await pages.courseList.getWebElements('courseNumber', course)
//   for (let i = 0; i < elements.length; i++) {
//     await sleep(500);
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//   }
// });

// After('@mediaproducer-delete-course', async function () {
//     let url = await _.get(urls, ['Achieve-CW', this.stack]);
//     let user = this.users['media_producer_2'];
//     await resetBrowser();
//     await visitURL(url);
//     await pages.home.click('signInLocal');
//     await pages.home.populate('username', user.username);
//     await pages.home.populate('password', user.password);
//     await pages.home.click('signIn')
//     let course = this.data.get('code');
//     let courseName = this.data.get('Number');
//     await pages.courseList.populate('search', courseName);
//     await pages.courseList.assertElementExists('courseNumber', course);
//     let elements = await pages.courseList.getWebElements('courseNumber', course)
//     console.log(elements.length + 'no');
//     for (let i = 0; i < elements.length; i++) {
//         await sleep(500);
//         await pages.coursePage.click('courseMenu');
//         await pages.courseList.click('deleteCourse');
//         await pages.courseList.click('confirmDelete');
//         await pages.home.click('closeAlert');
//     }
// });

// After('@instructor-delete-course', async function () {
//     let url = await _.get(urls, ['Achieve-CW', this.stack]);
//     let user = this.users['instructor_1'];
//     await resetBrowser();
//     await visitURL(url);
//     await pages.home.click('signInLocal');
//     await pages.home.populate('username', user.username);
//     await pages.home.populate('password', user.password);
//     await pages.home.click('signIn')
//     let course = this.data.get('course');
//     await pages.createCourse.assertElementExists('courseCard', course);
//     let elements = await pages.createCourse.getWebElements('courseCard', course)
//     for (let i = 0; i < elements.length; i++) {
//         await pages.courseList.click('courseMenu', course);
//         await pages.courseList.click('deleteCourse');
//         await pages.courseList.assertElementExists('confirmDelete')
//         await pages.courseList.click('confirmDelete');
//         await pages.home.click('closeAlert');
//     }
// });

// After('@instructor-masterSection-delete-course', async function () {
//     let url = await _.get(urls, ['Achieve-CW', this.stack]);
//     let user = this.users['instructor_1'];
//     await resetBrowser();
//     await visitURL(url);
//     await pages.home.click('signInLocal');
//     await pages.home.populate('username', user.username);
//     await pages.home.populate('password', user.password);
//     await pages.home.click('signIn')
//     let course = this.data.get('course');
//     await pages.courseList.click('courseTemplate', 'MASTER SECTIONS')
//     await pages.courseList.assertElementExists('masterMenu', course);
//     let elements = await pages.courseList.getWebElements('masterMenu', course)
//     for (let i = 0; i < elements.length; i++) {
//         await pages.courseList.click('masterMenu', course);
//         await pages.masterSection.click('deleteMS');
//         await pages.masterSection.assertElementExists('confirmDeleteMS')
//         await pages.masterSection.click('confirmDeleteMS')   
//         await pages.home.click('closeAlert');
//     }
// });















// //***********           this After always needs to be at the bottom of this file           ***********//
// After(async function (scenario) {
//     if (this.screenshots.toLowerCase().includes('onfail') &&
//         scenario.result.status.toLowerCase().includes('fail')) {
//         await this.attach(await takeScreenshot(), 'image/png');
//     }
// });
