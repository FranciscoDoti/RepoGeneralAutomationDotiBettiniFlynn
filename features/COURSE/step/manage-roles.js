// const { When, Then } = require('cucumber');
// const expect = require('chai').expect;
// const _ = require('lodash');

// When(/^I give to the user "(.*)" and grant a new role$/, async function (user) {
//   let qa = new selenium(this.driver);
//   let payload = require(`../../_data/user/${config.environment}/${user}.json`);

//   await qa.sleep(300);
//   await qa.input(page.course.home.input_mail_manage_roles, payload.username);
//   await qa.exists(page.course.home.select_role_manage_roles, 100);
//   await qa.click(page.course.home.select_role_manage_roles);
//   await qa.exists(page.course.home.costumer_support_manage_roles, 100);
//   await qa.click(page.course.home.costumer_support_manage_roles);
//   await qa.exists(page.course.home.revoke_manage_roles, 100);
//   await qa.click(page.course.home.grant_manage_roles);
// });

// Then(/^I revoke the given role to the user "(.*)"$/, async function (user) {
//   let qa = new selenium(this.driver);
//   let payload = require(`../../_data/user/${config.environment}/${user}.json`);

//   await qa.sleep(500);
//   await qa.input(page.course.home.input_mail_manage_roles, payload.username);
//   await qa.exists(page.course.home.select_role_manage_roles, 100);
//   await qa.click(page.course.home.select_role_manage_roles);
//   await qa.exists(page.course.home.costumer_support_manage_roles, 100);
//   await qa.click(page.course.home.costumer_support_manage_roles);
//   await qa.exists(page.course.home.revoke_manage_roles, 100);
//   await qa.click(page.course.home.revoke_manage_roles);
// });
