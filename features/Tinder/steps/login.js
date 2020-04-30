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



module.exports = {
  
};
