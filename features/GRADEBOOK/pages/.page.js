const stepsPath = `${process.cwd()}/features/GRADEBOOK/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    gradebook: new PageObject('gradebook.json', stepsPath),
};

module.exports ={
    pages
};
