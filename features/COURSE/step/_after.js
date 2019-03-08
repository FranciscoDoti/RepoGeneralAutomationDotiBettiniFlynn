const After = require('cucumber').After;
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');


After('@delete-course', async function () {
  let qa = new selenium(this.driver);
  await qa.sleep(1);
  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(1);
  await qa.click(page.course.course_list.delete_course);
  await qa.sleep(1);
  await qa.click(page.course.course_list.confirm_delete);
  await qa.sleep(2);
});
