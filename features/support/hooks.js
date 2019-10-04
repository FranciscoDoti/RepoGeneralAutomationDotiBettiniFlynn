var { After, AfterAll } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const { closeBrowser, resetBrowser, takeScreenshot, visitURL, getCapabilities, config, sleep } = require(`${process.cwd()}/app/driver`);
const asmtpages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

After(async function (scenario) {
    await resetBrowser();
});

AfterAll(async function () {
    config.capabilities = await getCapabilities();
    await closeBrowser();   
    setTimeout(function () {
        updateMetadataInJSON(`${process.cwd()}/${config.reportJSON}`)
    }, 2000);
});

const updateMetadataInJSON = function(reportPath){
    const metadata = {
        "Browser" : config.capabilities.get('browserName').toUpperCase(),
        "Browser Version" : config.capabilities.get('browserVersion').toUpperCase(),
        "Platform" : config.capabilities.get('platformName').toUpperCase(),
        "Environment" : config.environment.toUpperCase(),
        "Stack" : config.stack.toUpperCase(),
        "Executed" : config.mode.toUpperCase(),
        "Date" : config.datetime.split('T')[0],
        "Time" : config.datetime.split('T')[1].split('.')[0]
    }

    const fs = require('fs');
    let contents = fs.readFileSync(reportPath);
    let json = JSON.parse(contents);
    for(let index = 0; index < json.length; index++ ){
        json[index].metadata = metadata;
    };
    contents = JSON.stringify(json);
    fs.writeFileSync(reportPath, contents);
};

// Delete the newly created assessment
After('@assessmentCreation', async function () {
    await asmtpages.assignmentTab.click('course Name');
    await asmtpages.assignmentTab.click('list Assessments', this.data.get('assessment_name'));
    await asmtpages.assignmentTab.click('list Assessments Delete', this.data.get('assessment_name'));
    await asmtpages.hatchlingItem.click('Submit Yes');
});


After('@admin-delete-courseTemplate', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.stack]);
    let user = this.users['admin_1'];
    await resetBrowser();

    await visitURL(url);
    await pages.home.click('signInLocal');
    await pages.home.populate('username', user.username);
    await pages.home.populate('password', user.password);
    await pages.home.click('signIn');

    let course = this.data.get('code');
    let courseName = this.data.get('Number');
    await pages.courseList.click('courseTemplate', 'Course Templates');
    await pages.courseList.populate('search', courseName);
    await pages.courseList.assertElementExists('courseNumber', course);
    let elements = await pages.courseList.getWebElements('courseNumber', course);
    for (let i = 0; i < elements.length; i++) {
        await pages.coursePage.click('courseMenu');
        await pages.coursePage.click('courseMenu');
        await pages.courseList.click('deleteCourse');
        await pages.courseList.assertElementExists('confirmDelete')
        await pages.courseList.click('confirmDelete');
        await pages.home.click('closeAlert');
    }
});

After('@medieditor-delete-course', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.stack]);
    let user = this.users['media_editor_1'];
    await resetBrowser();

    await visitURL(url);
    await pages.home.click('signInLocal');
    await pages.home.populate('username', user.username);
    await pages.home.populate('password', user.password);
    await pages.home.click('signIn');
    let course = this.data.get('code');
    let courseName = this.data.get('Number');
    await pages.courseList.populate('search', courseName);
    await pages.courseList.assertElementExists('courseNumber', course);
    let elements = await pages.courseList.getWebElements('courseNumber', course);
    for (let i = 0; i < elements.length; i++) {
        await pages.coursePage.click('courseMenu');
        await pages.coursePage.click('courseMenu');
        await pages.courseList.click('deleteCourse');
        await pages.courseList.assertElementExists('confirmDelete')
        await pages.courseList.click('confirmDelete');
        await pages.home.click('closeAlert');
    }
});

After('@customersupport-delete-course', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.stack]);
    let user = this.users['customer_support_1'];
    await resetBrowser();

    await visitURL(url);
    await pages.home.click('signInLocal');
    await pages.home.populate('username', user.username);
    await pages.home.populate('password', user.password);
    await pages.home.click('signIn');

    let course = this.data.get('code');
    let courseName = this.data.get('Number');
    await pages.courseList.populate('search', courseName);
    await pages.courseList.assertElementExists('courseNumber', course);
    let elements = await pages.courseList.getWebElements('courseNumber', course);
    for (let i = 0; i < elements.length; i++) {
        await pages.coursePage.click('courseMenu');
        await pages.coursePage.click('courseMenu');
        await pages.courseList.click('deleteCourse');
        await pages.courseList.assertElementExists('confirmDelete')
        await pages.courseList.click('confirmDelete');
        await pages.home.click('closeAlert');
    }
});
After('@mediaproducer-delete-courseTemplate', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.stack]);
    let user = this.users['media_producer_2'];
    await resetBrowser();
    await visitURL(url);
    await pages.home.click('signInLocal');
    await pages.home.populate('username', user.username);
    await pages.home.populate('password', user.password);
    await pages.home.click('signIn')
    let course = this.data.get('code');
    let courseName = this.data.get('Number');
    await pages.courseList.click('courseTemplate', 'Course Templates');
    await pages.courseList.populate('search', courseName);
    await pages.courseList.assertElementExists('courseNumber', course);
    let elements = await pages.courseList.getWebElements('courseNumber', course)
    for (let i = 0; i < elements.length; i++) {
        await pages.coursePage.click('courseMenu');
        await pages.coursePage.click('courseMenu');
        await pages.courseList.click('deleteCourse');
        await pages.courseList.click('confirmDelete');
        await pages.home.click('closeAlert');
    }
});

After('@mediaproducer-delete-course', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.stack]);
    let user = this.users['media_producer_2'];
    await resetBrowser();
    await visitURL(url);
    await pages.home.click('signInLocal');
    await pages.home.populate('username', user.username);
    await pages.home.populate('password', user.password);
    await pages.home.click('signIn')
    let course = this.data.get('code');
    let courseName = this.data.get('Number');
    await pages.courseList.populate('search', courseName);
    await pages.courseList.assertElementExists('courseNumber', course);
    let elements = await pages.courseList.getWebElements('courseNumber', course)
    console.log(elements.length + 'no');
    for (let i = 0; i < elements.length; i++) {
        await pages.coursePage.click('courseMenu');
        await pages.coursePage.click('courseMenu');
        await pages.courseList.click('deleteCourse');
        await pages.courseList.click('confirmDelete');
        await pages.home.click('closeAlert');
    }
});

After('@instructor-delete-course', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.stack]);
    let user = this.users['instructor_1'];
    await resetBrowser();
    await visitURL(url);
    await pages.home.click('signInLocal');
    await pages.home.populate('username', user.username);
    await pages.home.populate('password', user.password);
    await pages.home.click('signIn')
    let course = this.data.get('course');
    await pages.createCourse.assertElementExists('courseCard', course);
    let elements = await pages.createCourse.getWebElements('courseCard', course)
    for (let i = 0; i < elements.length; i++) {
        await pages.coursePage.click('courseMenu');
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