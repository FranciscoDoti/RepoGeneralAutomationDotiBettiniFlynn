// var { After, AfterAll } = require('cucumber');
// const _ = require('lodash');
// const urls = require(`${process.cwd()}/config/urls.json`);
// const users = require(`${process.cwd()}/features/shared/data/users.json`);
// const { closeBrowser, resetBrowser, takeScreenshot, visitURL } = require(`${process.cwd()}/app/driver`);
// const asmtpages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
// const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

// After(async function (scenario) {
//   console.log(scenario.result.status);
//   if (this.screenshots.toLowerCase().includes('onfail')
//     && scenario.result.status.toLowerCase().includes('fail')) {
//     await this.attach(await takeScreenshot(), 'image/png');
//   }
//   await resetBrowser();
// });

// AfterAll(async function () {
//   await closeBrowser();
// });

// // Delete the newly created assessment
// After('@assessmentCreation', async function () {
//   await asmtpages.assignmentTab.click('course Name');
//   await asmtpages.assignmentTab.click('list Assessments', "QAAssessment");
//   await asmtpages.assignmentTab.click('list Assessments Delete', "QAAssessment");
//   await asmtpages.hatchlingItem.click('Submit Yes');
// });

// After('@mediaproducer-delete-course', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.environment]);
//   let user = await _.get(users, [this.environment, 'media_producer_2']);
//   await resetBrowser();
//   await visitURL(url);
//   await pages.home.click('signInLocal');
//   await pages.home.populate('username', user.username);
//   await pages.home.populate('password', user.password);
//   await pages.home.click('signIn')
//   let course = this.data.get('code');
//   let courseName = this.data.get('Number');
//   await pages.courseList.populate('search', courseName);
//   await pages.courseList.assertElementExists('courseNumber', course);
//   let elements = await pages.courseList.getWebElements('courseNumber', course)
//   console.log(elements.length+'no');
//   for (let i = 0; i < elements.length; i++) {
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//   }
// });

// After('@instructor-delete-course', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.environment]);
//   let user = await _.get(users, [this.environment, 'instructor_1']);
//   await resetBrowser();  
//   await visitURL(url);
//   await pages.home.click('signInLocal');
//   await pages.home.populate('username', user.username);
//   await pages.home.populate('password', user.password);
//   await pages.home.click('signIn')
//   let course = this.data.get('course');
//   await pages.createCourse.assertElementExists('courseCard', course);
//   let elements = await pages.createCourse.getWebElements('courseCard', course)
//   for (let i = 0; i < elements.length; i++) {
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.assertElementExists('confirmDelete')
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//   }
// });

// After('@admin-delete-course', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.environment]);
//   let user = await _.get(users, [this.environment, 'admin_1']);
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
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.assertElementExists('confirmDelete')
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//   }
// });

// After('@medieditor-delete-course', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.environment]);
//   let user = await _.get(users, [this.environment, 'media_editor_1']);
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
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.assertElementExists('confirmDelete')
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//   }
// });

// After('@custmersupport-delete-course', async function () {
//   let url = await _.get(urls, ['Achieve-CW', this.environment]);
//   let user = await _.get(users, [this.environment, 'customer_support_1']);
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
//     await pages.coursePage.click('courseMenu');
//     await pages.courseList.click('deleteCourse');
//     await pages.courseList.assertElementExists('confirmDelete')
//     await pages.courseList.click('confirmDelete');
//     await pages.home.click('closeAlert');
//   }
// });
