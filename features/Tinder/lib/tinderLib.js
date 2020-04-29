const pages = require(`${process.cwd()}/features/Tinder/pages/.page.js`).pages;

const iniciarSesionConFacebook = async function (usuario, contraseña) {
    await pages.paginaLogin.click('Boton Iniciar Sesion con Facebook');
    await pages.paginaLogin.switchToTab('Facebook');
    await pages.paginaFacebook.populate('Usuario', usuario);
    await pages.paginaFacebook.populate('Contraseña', contraseña);
    await pages.paginaFacebook.click('Entrar');
};



module.exports = {
    iniciarSesionConFacebook
};
