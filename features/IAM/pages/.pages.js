const stepsPath = `${process.cwd()}/features/IAM/pages/`;
const { PageObject } = require('test-automation-pack/PageObject');

const pages = {
    forgot: new PageObject('forgot.json', stepsPath),
    signIn: new PageObject('signIn.json', stepsPath)
};

module.exports ={
    pages
};