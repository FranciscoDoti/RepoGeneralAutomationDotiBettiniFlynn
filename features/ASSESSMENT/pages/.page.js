const stepsPath = `${process.cwd()}/features/ASSESSMENT/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    editorPanel: new PageObject('editorPanel.json',stepsPath),
    moldraw: new PageObject('moldraw.json',stepsPath),
    raptor: new PageObject('raptor.json',stepsPath)
};

module.exports ={
    pages
};