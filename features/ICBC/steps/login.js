const { Given, When, Then } = require('cucumber');
const { visitURL } = require('test-automation-pack/driver');
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { icbcLib } = require(`${process.cwd()}/features/ICBC/lib/index.js`);

Given('Abro la pagina de ICBC', async function () {

    this.url = await _.get(this.urls, ['ICBC', "uat"]);
    //let user = this.users[userType];
    await visitURL(this.url);

});
When(/^Busco "(.*)" y compro el producto$/, async function (producto) {
    await icbcLib.buscarProducto(producto);

});

When(/^Inicio sesion con usuario "(.*)" y contraseña "(.*)"$/, async function (usuario, contraseña) {
    await icbcLib.LogIn(usuario, contraseña);

});

When('Acepto las condiciones y voy a la caja', async function () {
    await icbcLib.Caja();

});

When(/^Selecciono "(.*)"$/, async function (TipoTarjeta) {
    await icbcLib.Tarjeta();

});

When('Cargo la siguiente informacion de la tarjeta', async function (dataTable) {
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        console.log('Hola');

    }
});

When('Selecciono el boton pagar', async function () {
    await icbcLib.Pagar();
});

Then('Verifico que la compra se completo correctamente', async function () {
    //PEDIRLE AYUDA A FRAN
});
