const stepsPath = `${process.cwd()}/features/ASSESSMENT/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    raptor: new PageObject('raptor.json',stepsPath),
    createAssessment: new PageObject('createAssessment.json', stepsPath),
    assessmentListPage: new PageObject('assessmentListPage.json', stepsPath),
    newAssessmentModal: new PageObject('newAssessmentModal.json', stepsPath),
    questionBank: new PageObject('questionBank.json', stepsPath),
    customQuestion: new PageObject('customQuestionsTab.json',stepsPath),
    hatchlingItem: new PageObject('hatchlingItemModal.json',stepsPath),
    assignmentTab: new PageObject('assignmentTab.json', stepsPath),
    moldraw: new PageObject('moldraw.json',stepsPath),
    multipleSelect: new PageObject('multipleSelect.json',stepsPath),
    raptor: new PageObject('raptor.json',stepsPath),
    sac: new PageObject('sac.json',stepsPath),
    assignmentTab: new PageObject('assignmentTab.json', stepsPath)
};

module.exports ={
    pages
};