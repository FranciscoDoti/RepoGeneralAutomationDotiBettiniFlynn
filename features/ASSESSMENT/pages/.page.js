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
    hatchlingItemFrame: new PageObject('hatchlingItemFrame.json',stepsPath),
    assignmentTab: new PageObject('assignmentTab.json', stepsPath),
    moldraw: new PageObject('moldraw.json',stepsPath),
    sac: new PageObject('sac.json',stepsPath),
    assignmentTab: new PageObject('assignmentTab.json', stepsPath),
    wordAnswer: new PageObject('wordAnswer.json', stepsPath),
    numericEntry: new PageObject('numericEntry.json', stepsPath),
    settingsPage: new PageObject('settingsPage.json', stepsPath),
    freeResponse: new PageObject('freeResponse.json', stepsPath),
    fillBlank: new PageObject('fillBlank.json', stepsPath),
    ams: new PageObject('ams.json', stepsPath),
    itemDetails: new PageObject('itemDetailsPopup.json', stepsPath),
    update: new PageObject('update.json', stepsPath),
    froala: new PageObject('froala.json', stepsPath),
    filters: new PageObject('filters.json',stepsPath),
    chemicalEquation: new PageObject('chemicalEquation.json',stepsPath),
    deletedItems: new PageObject('deletedItems.json',stepsPath)
};

module.exports ={
    pages
};