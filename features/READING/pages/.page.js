const stepsPath = `${process.cwd()}/features/READING/pages/`;
const { PageObject } = require('test-automation-pack/PageObject');

const pages = {
    ebook: new PageObject('ebook.json', stepsPath),
    localEbook: new PageObject('localEbook.json', stepsPath)
};

module.exports ={
    pages
};
