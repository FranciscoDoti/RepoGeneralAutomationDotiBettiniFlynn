const { When, Then } = require('cucumber');
const expect = require('chai').expect;


When(/^I give to the user "(.*)" and grant a new role$/, async function (user) {

  let payload = require(`../../_data/user/${config.environment}/${user}.json`);


await pages.home.populate('input_mail_manage_roles',  payload.username);
await pages.home.assertElementExists('select_role_manage_roles, 100');
await pages.home.click('select_role_manage_roles');
await pages.home.assertElementExists('costumer_support_manage_roles, 100');
await pages.home.click('costumer_support_manage_roles');
await pages.home.assertElementExists('revoke_manage_roles, 100');
await pages.home.click('grant_manage_roles');
});

Then(/^I revoke the given role to the user "(.*)"$/, async function (user) {

  let payload = require(`../../_data/user/${config.environment}/${user}.json`);


await pages.home.populate('input_mail_manage_roles',  payload.username);
await pages.home.assertElementExists('select_role_manage_roles, 100');
await pages.home.click('select_role_manage_roles');
await pages.home.assertElementExists('costumer_support_manage_roles, 100');
await pages.home.click('costumer_support_manage_roles');
await pages.home.assertElementExists('revoke_manage_roles, 100');
await pages.home.click('revoke_manage_roles');
});
