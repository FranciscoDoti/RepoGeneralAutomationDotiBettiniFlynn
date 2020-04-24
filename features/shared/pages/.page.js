const stepsPath = `${process.cwd()}/features/shared/pages/`;
const { PageObject } = require('test-automation-pack/PageObject');

let pages = {
    login: new PageObject('login.json', stepsPath),
};

module.exports ={
    pages
};