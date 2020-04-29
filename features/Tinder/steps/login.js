const { Given, When } = require('cucumber');
const { visitURL } = require('test-automation-pack/driver');
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { tinderLib } = require(`${process.cwd()}/features/Tinder/lib/index.js`);

Given('Inicio sesion en Tinder con {} y {}', async function (usuario, contraseña) {
  
  this.url = await _.get(this.urls, ['Tinder', this.stack]);
  //let user = this.users[userType];
  await visitURL(this.url);
  await tinderLib.iniciarSesionConFacebook(usuario, contraseña);

  });




When(/^I go back to sapling page and logout$/, async function () {
  this.url = await _.get(this.urls, ['IBISCMS', this.stack]);
  await mathPages.saplingLearning.switchToTab('Sapling');
  await visitURL(this.url);
  await mathPages.saplingLearning.click('RaptorAdmin');
  await mathPages.saplingLearning.click('logout');
});







Given('I login to IBISCMS as {string}', async function (userType) {
  this.url = await _.get(this.urls, ['IBISCMS', this.stack]);
  let user = this.users[userType];

  await visitURL(this.url);
  if (this.environment === 'local') {
    await pages.login.populate('username-local', user.username);
    await pages.login.populate('password-local', user.password);
    await pages.login.click('submit-local')
  } else {
    await pages.login.populate('username', user.username);
    await pages.login.populate('password', user.password);
    await pages.login.click('submit')
  };
});




module.exports = {
  
};
