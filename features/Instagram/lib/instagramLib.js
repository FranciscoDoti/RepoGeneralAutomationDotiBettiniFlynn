const pages = require(`${process.cwd()}/features/instagram/pages/.page.js`).pages;

const iniciarSesionDeInstagram = async function (usuario, contraseña) {

    await pages.paginaLogin.populate('Usuario', usuario);
    await pages.paginaLogin.populate('Contraseña', contraseña);
    await pages.paginaLogin.click('Log In');
};

const seguirAPersonas = async function (cantPersonas) {
    // PRECONDICION: No usar con más de 60 personas.
    var vectorUsuariosASeguir = await pages.paginaSugerencias.getWebElements('Follow');
    for (var i = 0; i <= cantPersonas; i=i+1) {
        
        vectorUsuariosASeguir[i].click();
        
    }

};


module.exports = {
    iniciarSesionDeInstagram,
    seguirAPersonas
};
