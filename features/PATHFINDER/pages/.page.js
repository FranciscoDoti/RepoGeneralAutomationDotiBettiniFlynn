const stepsPath = `${process.cwd()}/features/PATHFINDER/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
  instructorAssignment: new PageObject('instructorAssignment.json', stepsPath),
  studentAssignment: new PageObject('studentAssignment.json', stepsPath),
  NGA: new PageObject('NGA.json', stepsPath),
  secondaryHeader: new PageObject('secondaryHeader.json', stepsPath)
};

module.exports ={
    pages
};
