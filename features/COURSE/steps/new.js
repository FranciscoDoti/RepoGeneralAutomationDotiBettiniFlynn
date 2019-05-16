const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const users = require(`${process.cwd()}/features/shared/data/users.json`);

When(/^I navigate to course "(.*)" "(.*)"$/, async function (type, identifier) {
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await pages.undefined.click('page_format');
});

Given('I click login to the Achieve product', async function () {
  let url = await _.get(URL, ['achieve', 'login']);

  await qa.goTo(url);
  await pages.home.click('sign_in');
});

Given(/^I search for "(.*)" course$/, async function (input) {
  await pages.course_list.populate('search', input);
});

When('I fill out the form to create course', async function (data_table) {
  await pages.create_course.click('button');
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object !== 'day') {
      await pages.create_course.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value)
    } else {
      await pages.create_course.click('select_day', data_table.hashes()[i].value);
    }
  }

  await pages.create_course.click('save');
});

When('I close the popup message', async function () {
  await pages.home.click('close_alert');
});

When('I fill out the form to update the template from draft to Template', async function (data_table) {
  await pages.course_list.click('course_menu');
  await pages.course_list.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      await pages.course_list.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value);
    } else {
      await pages.create_course.click('select_day', data_table.hashes()[i].value);
    }
  }
});

When('I click on course card', async function () {
  await pages.create_course.click('course_card');
});

When('I click on resource tab', async function () {
  await pages.course_page.click('resources');
});

When('I add the activity to the course under the resources tab', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.resources.click('add_content');
    await pages.resources.populate('search_bar', data_table.hashes()[i].activity);
    await pages.resources.click('search_bar');
    await pages.resources.click(data_table.hashes()[i].type);
    await pages.resources.click('close_resource_search_nav');
  }
});

When('I click on home button to return to coursepage', async function () {
  await pages.main.click('achieve_home');
});

When('I fill out the form to copy a course', async function (data_table) {
  await pages.course_list.click('course_menu');
  await pages.course_list.click('copy_course');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.create_course.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
  await pages.create_course.click('save_copycourse');
});

When('I sign out of Achieve', async function () {
  await pages.home.click('toggler_menu');
  await pages.home.click('sign_out');
});

When(/^ I click on search button and input "(.*)" to search the course$/, async function (CourseName) {
  await pages.course_list.popualte('search', CourseName)
});

When(/^I assign "(.*)" to the course$/, async function (userName) {
  let user = await _.get(users, [this.environment, userName]);
  await pages.course_list.click('course_menu');
  await pages.course_list.click('Manage_instructor');
  await pages.create_course.populate('add_instructor', user.username);
  await pages.create_course.click('add_instructor_button');
  await pages.create_course.click('add_instructor_close');
});

When('I fill out the form to update the status of course to active', async function (data_table) {
  await pages.course_list.click('course_menu');
  await pages.course_list.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      await pages.course_list.populate(data_table.hashes()[i].page_object, data_table.hashes()[i].value);
    } else {
      await pages.create_course.populate('select_day', data_table.hashes()[i].value);
    }
  }
  await pages.course_list.click('end_date');
  await pages.course_list.click('next_month_button');
  await pages.course_list.click('next_month_button');
  await pages.course_list.click('select_date');
  await pages.create_course.click('save_editcourse');
});

When('I create custom made activity', async function (data_table) {
  await pages.course_page.click('course_planner');
  await pages.course_planner.click('custom_content_button');
  await pages.course_planner.click('New_custom');
  await pages.course_planner.click('assessment_button');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.course_planner.populate(data_table.hashes()[i].activity, data_table.hashes()[i].value);
  }
  await pages.course_planner.click('reset_model');
  await pages.course_planner.click('Question_bank');
  await pages.course_planner.click('Check_box_assignment');
  await pages.course_planner.click('Add_assignment_button');
  await pages.course_planner.browserBack();
  await pages.course_planner.browserBack();
  await pages.course_planner.browserBack();
});

When('I add the activities in courseplanner', async function (data_table) {
  await pages.create_course.click('course_card');
  await pages.course_page.click('course_planner');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.course_planner.click('custom_content_button');
    await pages.course_planner.populate('library_search_input', data_table.hashes()[i].activity);
    await pages.course_planner.click('library_search_input');
    await pages.course_planner.click('add_assignment_button');
    await pages.course_planner.click('close_courseplanner');
  }
});

When('I add custom made activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.course_planner.click('custom_content_button');
    await pages.course_planner.click('your_activity');
    await pages.course_planner.populate('library_search_input', data_table.hashes()[i].activity);
    await pages.course_planner.click('library_search_input');
    await pages.course_planner.click('add_custom_activity');
    await pages.course_planner.click('close_courseplanner');
  }
});

When('I assign the activities in courseplanner', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    let Elements = await pages.course_planner.getWebelements('assign_assignment_button');
    let countlinks = Elements.length;
    let x = countlinks - 1;
    while (x >= 0) {
      x--;
      await pages.course_planner.click('assign_assignment_button');
      await pages.course_planner.click('vissibility_button');
      await pages.course_planner.populate('points_input', data_table.hashes()[i].Points);
      await pages.course_planner.click('assign_button');
      await pages.home.click('close_alert');
      break;
    }
  }
});

When(/^I enroll the "(.*)" in the course$/, async function (user) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.create_course.click('course_card');
  await pages.home.click('toggler_menu');
  await pages.user.click('admin');
  await pages.home.click('manage_enrollments');
  await pages.home.populate('manage_enrollements_input', payload.username);
  await pages.home.click('add_user_button');
  await pages.home.click('close_manage_roles');
});

When('I click on reading activity', async function (data_table) {
  await pages.create_course.click('course_card');
  for (let i = 0; i < data_table.rows().length; i++) {
    let activityName = await pages.overview.getText('Activity_link');
    if (activityName === data_table.hashes()[i].activity) {
      await pages.overview.click('Activity_link');
    }
  }
});

Then('I verify reading activity has content to read', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.getAttributeValue('reading_verification', data_table.hashes()[i].activity);
  }
});

Then(/^I verify that "(.*)" activity status as completed$/, async function (activityName) {
  let elements = await pages.course_planner.getText('custom_activity_validation');
  if (elements = activityName) {
    await pages.overview.assertElementExists('complete_status');
  }
});
