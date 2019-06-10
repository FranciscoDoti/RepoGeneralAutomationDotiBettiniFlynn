const stepsPath = `${process.cwd()}/features/LC/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

const pages = {
    instructorCommon: new PageObject('lc-instructor-common.json', stepsPath),
    instructorLc: new PageObject('lc-instructor-lc.json', stepsPath),
    instructorLcrp: new PageObject('lc-instructor-lcrp.json', stepsPath),
    instructorTnI: new PageObject('lc-trends-and-insights.json', stepsPath),
    quiz: new PageObject('lc-quiz.json', stepsPath),
    studentCommon: new PageObject('lc-student-common.json', stepsPath),
    studentLc: new PageObject('lc-student-lc.json', stepsPath),
    studentLcrp: new PageObject('lc-student-lcrp.json', stepsPath),
    studentTnI: new PageObject('lc-trends-and-insights.json', stepsPath),
};

module.exports = {
    pages
};