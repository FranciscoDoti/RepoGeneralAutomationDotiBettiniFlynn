const After = require('cucumber').After;
const selenium = require('../../../app/selenium');
const URL = require('../../_support/url.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');

After('@delete-course', async function () {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/media_producer_2.json`);

  await qa.click(page.course.user.menu);
  await qa.sleep(config.sleep);
  await qa.click(page.course.user.sign_out);
  await qa.sleep(config.sleep);
  await qa.goTo(URL.achieve.login);
  await qa.click(page.course.home.sign_in);
  await qa.input(page.iam.login.username, payload.username, true);
  await qa.input(page.iam.login.password, payload.password, true);
  await qa.click(page.iam.login.sign_in);
  let elements = await qa.getArray(page.course.create_course.course_card);
  for (let i = 0; i < elements.length; i++) {
    await qa.click(page.course.course_list.course_menu);
    await qa.sleep(config.sleep);
    await qa.click(page.course.course_list.delete_course);
    await qa.sleep(config.sleep);
    await qa.click(page.course.course_list.confirm_delete);
    await qa.sleep(config.sleep * 2);
  };
});
