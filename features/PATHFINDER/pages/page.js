const stepsPath = `${process.cwd()}/features/PATHFINDER/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pf_pages = {
  pf_course: new PageObject('pf_course.json', stepsPath)
};

module.exports ={
    pf_pages
};
