const {After} = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const urls = require(`${process.cwd()}/config/urls.json`);
const {resetBrowser,visitURL} = require(`${process.cwd()}/app/driver`);
const _ = require('lodash');

After('@delete-mediaproducer-courses', async function () {
  let user = await _.get(users, [this.environment, 'media_producer_2']);
  await pages.home.click('signInLocal');
  await pages.home.populate('username', user.username);
  await pages.home.populate('password', user.password);
  await pages.home.click('signIn')
  let elements = await pages.courseList.getWebElements('courseCard');
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
  }
});

After('@delete-ISBN-9781464199499', async function () {
  let user = await _.get(users, [this.environment, 'admin_1']);
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal');
  await pages.home.populate('username', user.username);
  await pages.home.populate('password', user.password);
  await pages.home.click('signIn')
  await pages.courseList.populate('search', '9781464199499');
  await pages.courseList.assertElementExists('ISBN', 'ISBN: 9781464199499');
  await pages.coursePage.click('courseMenu');
  await pages.courseList.click('deleteCourse');
  await pages.courseList.click('confirmDelete');
});

After('@delet-CourseName', async function (){
  await resetBrowser();
  let url = await _.get(urls, ['Achieve-CW', this.environment]);
  await visitURL(url);
  let user = await _.get(users, [this.environment, 'media_producer_2']);
  await pages.home.click('signInLocal');
  await pages.home.populate('username', user.username);
  await pages.home.populate('password', user.password);
  await pages.home.click('signIn');
  let courseName = this.data.get('course name');
  await pages.courseList.populate('search', courseName);
  let elements = await pages.createCourse.getWebElements('courseCard', courseName);
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
  }
  await resetBrowser();
});