const stepsPath = `${process.cwd()}/features/READING/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    ebook: new PageObject('ebook.json', stepsPath)
};

module.exports ={
    pages
};
