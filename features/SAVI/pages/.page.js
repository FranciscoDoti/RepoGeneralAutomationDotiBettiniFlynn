const stepsPath = `${process.cwd()}/features/SAVI/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    brightcovevideo: new PageObject('brightcovevideo.json', stepsPath),
    saplingLearning: new PageObject('saplingLearning.json', stepsPath),
    login: new PageObject('login.json', stepsPath),
    mol3d: new PageObject('mol3d.json', stepsPath),
    activityguide: new PageObject('activityguide.json', stepsPath),
};

module.exports = {
    pages
};
