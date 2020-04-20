var { After, AfterAll } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const { closeBrowser, resetBrowser, takeScreenshot, visitURL, config } = require(`${process.cwd()}/app/driver`);
const asmtpages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);
const { loginAchieveCw } = require(`${process.cwd()}/features/shared/steps/login.js`);

After(async function (scenario) {
  await resetBrowser();
});

AfterAll(async function () {
  await closeBrowser();
});
var { After, AfterAll } = require('cucumber');
const specPath = `${process.cwd()}/features/COURSE/apispecs`;
const { RestObject } = require(`${process.cwd()}/app/rest`);


After('@delete-Courses', async function () {
  let spec = `${specPath}/deletecourse.json`;
  let jwt_payload = this.users['admin_1'].jwt_payload;

  this.data.data.keys().forEach(courseName => {
    let api = new RestObject(spec);
    api.setCookie(jwt_payload);
    api.spec.endpoint = api.spec.endpoint.replace('{id}', this.data.get(courseName).id);
    api.DELETE('Achieve-CW');
  });
});

// Delete the newly created assessment
After('@assessmentCreation', async function () {
  await asmtpages.assignmentTab.click('course Name');
  await asmtpages.assignmentTab.click('list Assessments', this.data.get('assessment_name'));
  await asmtpages.assignmentTab.click('list Assessments Delete', this.data.get('assessment_name'));
  await asmtpages.hatchlingItem.click('Submit Yes');
});

After('@admin-delete-course', async function () {
  await resetBrowser();
  await loginAchieveCw('admin_1', this);

  let courseName = this.data.get('courseName');
  await pages.courseList.populate('search', courseName);
  let courseElements = await pages.courseList.getWebElements('courseName', courseName);
  for (let i = 0; i < courseElements.length; i++) {
    await sleep(1000);
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');

  }
});

After('@admin-delete-courseTemplate', async function () {
  await resetBrowser();
  await loginAchieveCw('admin_1', this);

  let course = this.data.get('code');
  let Name  = this.data.get('Name');
  let courseName = this.data.get('Number');
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await pages.courseList.populate('search', courseName);
  await sleep(500);
  await pages.courseList.assertElementExists('courseMenuTemplate', Name);
  let elements = await pages.courseList.getWebElements('courseMenuTemplate', Name);
  for (let i = 0; i < elements.length; i++) {
    await sleep(500);
    await pages.courseList.click('courseMenuTemplate', Name);
    await pages.courseList.click('deleteCourse');
    await pages.courseList.assertElementExists('confirmDelete')
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
});

After('@mediaeditor-delete-course', async function () {
  await resetBrowser();
  await loginAchieveCw('media_editor_1', this);

  let course = this.data.get('code');
  let courseName = this.data.get('Number');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseNumber', course);
  let elements = await pages.courseList.getWebElements('courseNumber', course);
  for (let i = 0; i < elements.length; i++) {
    await sleep(500);
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.assertElementExists('confirmDelete');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
    break;
  }
});

After('@customersupport-delete-course', async function () {
  await resetBrowser();
  await loginAchieveCw('customer_support_1', this);

  let course = this.data.get('code');
  let courseName = this.data.get('courseName');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseNumber', course);
  let elements = await pages.courseList.getWebElements('courseNumber', course);
  for (let i = 0; i < elements.length; i++) {
    await sleep(500);
    await pages.createCourse.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.assertElementExists('confirmDelete')
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
});
After('@mediaproducer-delete-courseTemplate', async function () {
  await resetBrowser();
  await loginAchieveCw('media_producer_2', this);
  let course = this.data.get('code');
  let courseName = this.data.get('Number');
  await pages.courseList.click('courseTemplate', 'COURSE TEMPLATES');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseNumber', course);
  let elements = await pages.courseList.getWebElements('courseNumber', course)
  for (let i = 0; i < elements.length; i++) {
    await sleep(500);
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
});

After('@mediaproducer-delete-course', async function () {
  await resetBrowser();
  await loginAchieveCw('media_producer_2', this);
  let course = this.data.get('code');
  let courseName = this.data.get('courseName');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseNumber', course);
  let elements = await pages.courseList.getWebElements('courseNumber', course)
  console.log(elements.length + 'no');
  for (let i = 0; i < elements.length; i++) {
    await sleep(500);
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
});

After('@instructor-delete-course', async function () {
  await resetBrowser();
  await loginAchieveCw('instructor_1', this);
  let course = this.data.get('course');
  await pages.createCourse.assertElementExists('courseCard', course);
  let elements = await pages.createCourse.getWebElements('courseCard', course)
  for (let i = 0; i < elements.length; i++) {
    await pages.courseList.click('courseMenu', course);
    await pages.courseList.click('deleteCourse');
    await pages.courseList.assertElementExists('confirmDelete')
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
});

After('@instructor-masterSection-delete-course', async function () {
  await resetBrowser();
  await loginAchieveCw('instructor_1', this);
  let course = this.data.get('course');
  await pages.courseList.click('courseTemplate', 'MASTER SECTIONS')
  await pages.courseList.assertElementExists('masterMenu', course);
  let elements = await pages.courseList.getWebElements('masterMenu', course)
  for (let i = 0; i < elements.length; i++) {
    await pages.courseList.click('masterMenu', course);
    await pages.masterSection.click('deleteMS');
    await pages.masterSection.assertElementExists('confirmDeleteMS')
    await pages.masterSection.click('confirmDeleteMS')
    await pages.home.click('closeAlert');
  }
});

After('@instructor-copyMasterSection-delete-course', async function () {
  await resetBrowser();
  await loginAchieveCw('instructor_1', this);
  let course = this.data.get('section');
  await pages.createCourse.assertElementExists('courseCard', course);
  let elements = await pages.createCourse.getWebElements('courseCard', course)
  for (let i = 0; i < elements.length; i++) {
    await pages.courseList.click('courseMenu', course);
    await pages.courseList.click('deleteCourse');
    await pages.courseList.assertElementExists('confirmDelete')
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
});
   




















//***********           this After always needs to be at the bottom of this file           ***********//
After(async function (scenario) {
  if (this.screenshots.toLowerCase().includes('onfail') &&
        scenario.result.status.toLowerCase().includes('fail')) {
    await this.attach(await takeScreenshot(), 'image/png');
  }
});