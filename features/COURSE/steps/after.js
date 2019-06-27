const {After} = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const _ = require('lodash');

After('@delete-mediaproducer-courses', async function () {
  let payload = await _.get(users, [this.environment, 'media_producer_2']);
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal');
  await pages.home.populate('username', payload.username);
  await pages.home.populate('password', payload.password);
  await pages.home.click('signIn')
  let elements = await pages.courseList.getWebElements('courseCard');
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
  }
});

After('@delete-ISBN-9781464199499', async function () {
  let payload = await _.get(users, [this.environment, 'media_editor_1']);
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal');
  await pages.home.populate('username', payload.username);
  await pages.home.populate('password', payload.password);
  await pages.home.click('signIn')
  await pages.courseList.populate('search', '9781464199499');
  await pages.courseList.assertElementExists('ISBN', 'ISBN: 9781464199499');
  await pages.coursePage.click('courseMenu');
  await pages.courseList.click('deleteCourse');
  await pages.courseList.click('confirmDelete');
});
