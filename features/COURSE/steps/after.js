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
  let courseName = this.data.get('course name');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('ISBN', 'ISBN: '+courseName);
  let elements = await pages.courseList.getWebElements('ISBN', 'ISBN: '+courseName)
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  }
});

After('@delete-admin-9781464199499', async function () {
  let payload = await _.get(users, [this.environment, 'admin_1']);
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal');
  await pages.home.populate('username', payload.username);
  await pages.home.populate('password', payload.password);
  await pages.home.click('signIn')
  let courseName = this.data.get('Number');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('ISBN', 'ISBN: '+courseName);
  let elements = await pages.courseList.getWebElements('ISBN', 'ISBN: '+courseName);
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
});

After('@delete-mediaEditor-9781464199499', async function () {
  let payload = await _.get(users, [this.environment, 'media_editor_1']);
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal');
  await pages.home.populate('username', payload.username);
  await pages.home.populate('password', payload.password);
  await pages.home.click('signIn')
  let courseName = this.data.get('Number');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('ISBN', 'ISBN: '+courseName);
  let elements = await pages.courseList.getWebElements('ISBN', 'ISBN: '+courseName)
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
});

After('@delete-customerSupport-9781464199499', async function () {
  let payload = await _.get(users, [this.environment, 'customer_support_1']);
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal');
  await pages.home.populate('username', payload.username);
  await pages.home.populate('password', payload.password);
  await pages.home.click('signIn')
  let courseName = this.data.get('Number');
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('ISBN', 'ISBN: '+courseName);
  let elements = await pages.courseList.getWebElements('ISBN', 'ISBN: '+courseName)
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
});

After('@delete-Instructor', async function () {
  let payload = await _.get(users, [this.environment, 'instructor_1']);
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal');
  await pages.home.populate('username', payload.username);
  await pages.home.populate('password', payload.password);
  await pages.home.click('signIn')
  let courseName = this.data.get('course');
  await pages.createCourse.assertElementExists('courseCard', courseName);
  let elements = await pages.createCourse.getWebElements('courseCard', courseName)
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
    await pages.home.click('closeAlert');
  }
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
});