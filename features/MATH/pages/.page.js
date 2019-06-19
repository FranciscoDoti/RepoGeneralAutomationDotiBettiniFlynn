const stepsPath = `${process.cwd()}/features/MATH/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    ams: new PageObject('ams.json', stepsPath),
    raptorAms: new PageObject('raptorAms.json', stepsPath),
    graphTab: new PageObject('graphTab.json', stepsPath),
    graphEditor: new PageObject('graphEditor.json', stepsPath),
    palette: new PageObject('palette.json', stepsPath),
};

module.exports = {
    pages
};