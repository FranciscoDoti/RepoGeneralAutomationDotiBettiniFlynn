const {After} = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

After('@delete-mediaproducer-courses', async function () {
  let user = this.users['media_producer_2'];
  await pages.home.click('togglerMenu');
  await pages.home.click('signOut');
  await pages.home.click('signInLocal', 'SIGN IN');
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
