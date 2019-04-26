const stepsPath = process.cwd() + '/features/shared/pages/';
const { PageObject } = require('../../../app/pageObject');

let pages = {
    login: new PageObject('login.json', stepsPath),
};

module.exports ={
    pages
};