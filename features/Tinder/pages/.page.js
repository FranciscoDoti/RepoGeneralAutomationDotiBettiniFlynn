const stepsPath = `${process.cwd()}/features/Tinder/pages/`;
const { PageObject } = require('test-automation-pack/PageObject');

let pages = {
    paginaLogin: new PageObject('paginaLogin.json',stepsPath),
    paginaFacebook: new PageObject('paginaFacebook.json',stepsPath)

};

module.exports ={
    pages
};