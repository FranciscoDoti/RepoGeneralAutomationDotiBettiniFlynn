const stepsPath = process.cwd() + '/features/MATH/pages/';
const { PageObject } = require('../../../app/pageObject');

let pages = {login : new PageObject('login.json', stepsPath),
ams : new PageObject('ams.json', stepsPath),
raptorAms : new PageObject('raptorAms.json', stepsPath),
graphTab : new PageObject('graphTab.json', stepsPath),
newGraph : new PageObject('newGraph.json', stepsPath),
paletteBasic : new PageObject('paletteBasic.json', stepsPath),
};

module.exports ={
    pages
};