const stepsPath = `${process.cwd()}/features/PATHFINDER/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
  instructorAssignmentPage: new PageObject('instructorAssignmentPage.json', stepsPath),
  NGA: new PageObject('NGA.json', stepsPath)
};

module.exports ={
    pages
};
