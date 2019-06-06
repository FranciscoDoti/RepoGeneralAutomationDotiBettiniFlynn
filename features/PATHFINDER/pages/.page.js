const stepsPath = `${process.cwd()}/features/PATHFINDER/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
  courseware: new PageObject('courseware.json', stepsPath)
};

module.exports ={
    pages
};
