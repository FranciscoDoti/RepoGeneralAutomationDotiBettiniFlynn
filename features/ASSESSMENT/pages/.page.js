const stepsPath = `${process.cwd()}/features/ASSESSMENT/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    moldraw: new PageObject('moldraw.json',stepsPath),
    multipleSelect: new PageObject('multipleSelect.json',stepsPath),
    raptor: new PageObject('raptor.json',stepsPath),
    sac: new PageObject('sac.json',stepsPath)
};

module.exports ={
    pages
};