const stepsPath = process.cwd() + '/features/MATH/pages/';
const { PageObject } = require('../../../app/pageObject');

const pages = {
    ams: new PageObject('ams.json', stepsPath),
    raptorAms: new PageObject('raptorAms.json', stepsPath),
    graphTab: new PageObject('graphTab.json', stepsPath),
    newGraph: new PageObject('newGraph.json', stepsPath),
    paletteBasic: new PageObject('paletteBasic.json', stepsPath),
};

module.exports ={
    pages
};