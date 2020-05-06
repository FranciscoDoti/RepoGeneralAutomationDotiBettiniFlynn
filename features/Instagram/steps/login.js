const { Given, When } = require('cucumber');
const { visitURL } = require(`${process.cwd()}/app/driver`);
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { instagramLib } = require(`${process.cwd()}/features/Instagram/lib/index.js`);

Given('Inicio sesion en instagram con {} y {}', async function (usuario, contraseña) {

    this.url = await _.get(this.urls, ['Instagram', this.stack]);
    //let user = this.users[userType];
    await visitURL(this.url);
    await instagramLib.iniciarSesionDeInstagram(usuario, contraseña);
    
});



module.exports = {

};