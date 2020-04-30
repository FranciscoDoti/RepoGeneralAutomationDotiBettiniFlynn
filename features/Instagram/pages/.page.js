const stepsPath = `${process.cwd()}/features/Instagram/pages/`;
const { PageObject } = require('test-automation-pack/PageObject');

let pages = {
    paginaLogin: new PageObject('paginaLogin.json',stepsPath),
    paginaInicio: new PageObject('paginaInicio.json',stepsPath),
    paginaSugerencias: new PageObject('paginaSugerencias.json',stepsPath)
};

module.exports ={
    pages
};