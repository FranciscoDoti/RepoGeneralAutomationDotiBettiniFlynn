const stepsPath = `${process.cwd()}/features/Tinder/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    paginaLogin: new PageObject('paginaLogin.json',stepsPath),
    paginaFacebook: new PageObject('paginaFacebook.json',stepsPath)

};

module.exports ={
    pages
};