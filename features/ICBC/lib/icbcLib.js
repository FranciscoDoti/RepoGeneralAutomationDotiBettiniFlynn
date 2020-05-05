const pages = require(`${process.cwd()}/features/ICBC/pages/.page.js`).pages;
const { sleep } = require('test-automation-pack/utils');

const iniciarSesionDeICBC = async function (usuario, contraseña) {

    await pages.paginaLogin.populate('Usuario', usuario);
    await pages.paginaLogin.populate('Contraseña', contraseña);
    await pages.paginaLogin.click('Log In');
};
const buscarProducto = async function (producto) {
    await pages.paginaInicio.click('Buscar');
    await pages.paginaInicio.populate('Buscar', producto);
    await pages.paginaInicio.click('Lupita');
    await pages.paginaInicio.click('Producto');
    await pages.paginaInicio.click('Comprar');
    
    
};
const LogIn = async function (usuario, contraseña) {
    await pages.paginaInicio.switchToTab('ICBC Store - Login');
    await pages.paginaLogin.populate('Usuario', usuario);
    await pages.paginaLogin.populate('Contraseña', contraseña);
    await pages.paginaLogin.click('Log In');
    await sleep(10000);
    await pages.paginaInicio.switchToTab('Pedido - ICBC Mall');
    
};
const Caja = async function () {
    await pages.paginaInicio.click('Aceptar');
    await pages.paginaInicio.click('Caja');
    
};

const Tarjeta = async function () {
    await sleep (5000);
    await pages.paginaInicio.click('TarjetaCredito');

};

const Pagar = async function () {
    await pages.paginaInicio.click('Pagar');

};

const DatosTarjeta = async function (dataTable) {
    await pages.paginaCompra.click();

};



module.exports ={
    iniciarSesionDeICBC,
    buscarProducto,
    LogIn,
    Caja,
    Tarjeta,
    Pagar,
    DatosTarjeta
};