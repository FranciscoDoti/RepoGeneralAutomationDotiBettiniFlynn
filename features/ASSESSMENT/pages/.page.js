const stepsPath = `${process.cwd()}/features/ASSESSMENT/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    moldraw: new PageObject('moldraw.json',stepsPath),
    raptor: new PageObject('raptor.json',stepsPath),
    raptor: new PageObject('raptor.json',stepsPath),
    createAssessment: new PageObject('createAssessment.json', stepsPath),
    assessmentListPage: new PageObject('assessmentListPage.json', stepsPath),
    newAssessmentModal: new PageObject('newAssessmentModal.json', stepsPath),
    questionBank: new PageObject('questionBank.json', stepsPath),
    assignmentTab: new PageObject('assignmentTab.json', stepsPath),
    multipleSelect: new PageObject('multipleSelect.json',stepsPath)
};

module.exports ={
    pages
};