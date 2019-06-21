const stepsPath = `${process.cwd()}/features/SAC/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    sac: new PageObject('sac.json',stepsPath)
};

module.exports ={
    pages
};