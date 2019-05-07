const { Given, When, Then } = require('cucumber');

const expect = require('chai').expect;

// Login Functionality //
async function formFill (driver, feature, page_object, value, clear) {
  let qa = new selenium(driver);

  if (page_object != 'day') {
    let PAGE = await _.get(page, ['course', feature, page_object]);
await pages.undefined.populate('PAGE',  value);
  } else {
    let page_format = format(page.course.create_course.select_day, value);
await pages.undefined.click('page_format');
  }

  if (feature === 'create_course' && page_object === 'course_status' && value === 'Active On Date') {
await pages.course_list.click('create_end_date');

await pages.course_list.click('next_month_button');

await pages.course_list.click('select_date');
  }
};

Given('I fill out the create course form', async function (data_table) {



  for (let i = 0; i < data_table.rows().length; i++) {
    await formFill(this.driver, 'create_course', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
await pages.create_course.click('save');
});

Given('I fill out the edit course form', async function (data_table) {


await pages.course_list.click('course_menu');
await pages.course_list.click('edit_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    await formFill(this.driver, 'course_list', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
await pages.create_course.click('save');
});

Given("I select a day next month for the course's End Date", async function () {



await pages.course_list.click('end_date');
await pages.course_list.click('next_month_button');
await pages.course_list.click('select_date');

await pages.create_course.click('save');

});

When('I fill out the form to copy a course', async function (data_table) {

await pages.course_list.click('course_menu');

await pages.course_list.click('copy_course');

  for (let i = 0; i < data_table.rows().length; i++) {
    await formFill(this.driver, 'create_course', data_table.hashes()[i].page_object, data_table.hashes()[i].value, data_table.hashes()[i].clear);
  };
await pages.create_course.click('save_copycourse');
});



Given(/^I navigate to the course page "(.*)" tab$/, async function (page_object) {

  let PAGE = await _.get(page, ['course', "course_page", page_object]);

await pages.create_course.click('course_card');
await pages.course_page.assertElementExists('overview');
await pages.undefined.click('PAGE');
});

Given('I add the activity to the course under the resources tab', async function (data_table) {


  for (let i = 0; i < data_table.rows().length; i++) {
    let PAGE = await _.get(page, ['course', 'resources', data_table.hashes()[i].type]);


await pages.resources.click('add_content');
await pages.resources.populate('search_bar',  data_table.hashes()[i].activity);
    await qa.seleniumKeys(page.course.resources.search_bar, 'enter');
await pages.resources.click('search_bar');
await pages.undefined.click('PAGE');

await pages.resources.click('close_resource_search_nav');
  }
});

Then('I verify the course_list data', async function (data_table) {

  let text = await qa.getText(page.course.create_course.course_card);
  for (let i = 0; i < data_table.rows().length; i++) {
    expect(text).to.contain(data_table.hashes()[i].value);
  };
});

