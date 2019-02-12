const { When, Then, After } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');

// Navigation
When(/^I navigate to course "(.*)" "(.*)"$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.exists(page_format);
});

When(/^I click on "(.*)" course card$/, async function (name) {
  let qa = new selenium(this.driver);
  let page_format = format(page.course.course_list.course_name, name);

  await qa.click(page_format);
});

When('I fill out the form to edit a course', async function (data_table) {
  let qa = new selenium(this.driver);

  await qa.sleep(1);
  for (let i = 0; i < data_table.rows().length; i++) {
    if (data_table.hashes()[i].page_object != 'day') {
      let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
      await qa.input(PAGE, data_table.hashes()[i].value, data_table.hashes()[i].clear);
    } else {
      let page_format = format(page.course.create_course.select_day, data_table.hashes()[i].value);
      await qa.click(page_format);
    }
  }

  await qa.click(page.course.create_course.save);
});

// FIXME Needs Implementation
When(/^I add Activities to course "(.*)" "(.*)"$/, async function (type, identifier, data_table) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.click(page_format);
  await qa.click(page.course.create_page.resources);
  await qa.click(page.course.create_page.add_activity);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'resources', 'search']);

    // INPUT SEARCH TERM
    // SELECT ADD BUTTON FROM LIST
    await qa.input(PAGE, data_table.hashes()[i].activity);
  }

  await qa.click(page.course.resources.add_activity, activity);
});

// FIXME NEEDS IMPLEMENTED
When(/^I search for "(.*)" course$/, async function (search) {
  let qa = new selenium(this.driver);

  await qa.input(page.course.main.search, search);
});

When('I click the Add course button', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.create_course.button);
});

When(/^I click on "(.*)" on "(.*)" course menu$/, async function (page_object, course_name) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', page_object]);
  let page_format = format(page.course.course_list.course_name_menu, course_name);

  await qa.click(page.course.course_list.course_menu);
  await qa.sleep(3);
  await qa.click(PAGE);
});

// FIXME NEEDS IMPLEMENTED
When(/^I add "(.*)" instructor's email to the course$/, async function (instructor) {
  let qa = new selenium(this.driver);
  let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

  await qa.input(page.course.create_course.add_instructor, instructor.email);
  await qa.click(page.course.create_course.add_instructor_button);
});

// FIXME NEEDS IMPLEMENTED
Then('I verify that the Course Specific Link opens the course named "(.*)"', async function (course_name) {
  let qa = new selenium(this.driver);

  // Click Copy button
  // Store clipboard to variable
  // Open new tab
  // Switch driver to new tab
  // Go to URL variable from clipboard
  // Get text on screen that has passed in string value
});

When('I logout of the achieve system', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.course.user.menu);
  await qa.click(page.course.user.sign_out);
});

// Assetions //
Then(/^I verify that the course "(.*)" "(.*)" is listed on the courses page$/, async function (type, identifier) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, ['course', 'course_list', type]);
  let page_format = format(PAGE, identifier);

  await qa.exists(page_format);
});

Then(/^I verify that the course's name "(.*)" is listed on the courses page$/, async function (identifier) {
  let qa = new selenium(this.driver);
  let page_format = format(page.course.course_list.course_name, identifier);

  await qa.exists(page_format);
});

Then('I verify the course_list data', async function (data_table) {
  let qa = new selenium(this.driver);
  await qa.click(page.course.create_course.course_menu);
  await qa.click(page.course.create_course.edit_course);
  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'course_list', data_table.hashes()[i].page_object]);
    let page_format = await format(PAGE, data_table.hashes()[0].value);

    let text = await qa.getText(page_format);
    expect(text).to.contain(data_table.hashes()[i].value);
  }
  await qa.sleep(2);
  await qa.click(page.course.create_course.cancel);
});

Then('I verify the create_course data', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'create_course', data_table.hashes()[i].page_object]);
    let page_format = await format(PAGE, data_table.hashes()[0].value);

    let text = await qa.getAttribute(page_format, 'value');
    expect(text).to.contain(data_table.hashes()[i].value);
  }
  // race condition, I have to wait for button to be visible
  await qa.sleep(3);
  await qa.click(page.course.create_course.cancel);
});

Then(/^I verify that it is redirected to "(.*)" course page$/, async function (course_page) {
  let qa = new selenium(this.driver);
  let course_page_element = await _.get(page, ['course', 'create_course', 'course_title']);

  let text = await qa.getText(course_page_element);
  expect(text).to.contain(course_page);
})

Then('I add the activity to the course under the resources tab', async function (data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let resources_tab_element = await _.get(page, ['course', 'course_page', 'resources']);
    let add_content_button_element = await _.get(page, ['course', 'resources', 'add_content']);
    let search_bar = await _.get(page, ['course', 'resources', 'search_bar']);
    let add_button_assessment_element = await _.get(page, ['course', 'resources', 'add_button_assessment']);
    let add_button_learningcurve_element = await _.get(page, ['course', 'resources', 'add_button_learningcurve']);
    let add_button_reading_element = await _.get(page, ['course', 'resources', 'add_reading_button']);
    let add_button_readandpractice_element = await _.get(page, ['course', 'resources', 'add_button_read&practice']);
    let add_button_file_element = await _.get(page, ['course', 'resources', 'add_file_button']);
    let close_resource_search_nav = await _.get(page, ['course', 'resources', 'close_resource_search_nav']);
    await qa.click(resources_tab_element);
    await qa.click(add_content_button_element);
    await qa.input(search_bar, data_table.hashes()[i].activity, 'clear');
    if (data_table.hashes()[i].type === 'learning_curve') {
      await qa.click(add_button_learningcurve_element);
    } else if (data_table.hashes()[i].type === 'assessment') {
      await qa.click(add_button_assessment_element);
    } else if (data_table.hashes()[i].type === 'Reading') {
      await qa.click(add_button_reading_element);
    } else if (data_table.hashes()[i].type === 'Read and Practice') {
      await qa.click(add_button_readandpractice_element);
    } else if (data_table.hashes()[i].type === 'file') {
      await qa.click(add_button_file_element);
    }
    await qa.click(close_resource_search_nav);
    
  }
})

Then('I verify activity list', async function (data_table) {
  let qa = new selenium(this.driver);
  let resources_tab_element = await _.get(page, ['course', 'course_page', 'resources']);
  await qa.click(page.course.course_list.course_menu);
  await qa.click(page.course.course_list.ed)
  await qa.click(resources_tab_element);
  for (let i = 0; i < data_table.rows().length; i++) {
    let activity_element = await _.get(page, ['course', 'resources', 'activity']);
    // let elementText = await qa.getTextOfElementInArray(activity_element, data_table.hashes()[i].activity);
    let elementText = await qa.getText(activity_element);
    if (elementText === undefined){
      elementText = 'Element Not Found';
    }
    expect(elementText).to.contain(data_table.hashes()[i].activity);
  }
})

Then('I click on the first course card', async function(){
  let qa = new selenium(this.driver);
  let course_card_element = await _.get(page, ['course', 'create_course', 'course_card']);
  await qa.sleep(2);
  await qa.click(course_card_element);
})

Then('I add the activities to the course under the course planner tab', async function () {
  let qa = new selenium(this.driver);
  let course_planner_tab_element = await _.get(page, ['course', 'course_page', 'course_planner']);
  let custom_content_tab_element = await _.get(page, ['course', 'course_planner', 'custom_content_tab']);
  let add_assignment_element = await _.get(page, ['course', 'course_planner', 'add_assignment']);  

  await qa.click(course_planner_tab_element);
  await qa.click(custom_content_tab_element);
  await qa.sleep(2);
  await qa.click(add_assignment_element);
  // await qa.clickElementInArray(add_assignment_element);
})

// FIXME Needs Implementation
Then('I verify data table courses populate the list', async function (data_table) {
  let qa = new selenium(this.driver);

  for (let i = 0; i < data_table.rows().length; i++) {
    // data_table.hashes()[i].activity
    let PAGE = await _.get(page, ['course', 'resources', 'list']);

    // VERIFY ACTIVITES HAVE BEEN ADD
    await qa.exists(page_format);
  }
});

// Cleanup //
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
