const stepsPath = `${process.cwd()}/features/ASSESSMENT/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    raptor: new PageObject('raptor.json',stepsPath),
    addItem: new PageObject('addItem.json',stepsPath)
};

module.exports ={
    pages
};