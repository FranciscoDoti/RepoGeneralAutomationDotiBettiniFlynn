const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const expect = require('chai').expect;

When(/^I select Question tab and click on algos Variables button$/, async function () {
    await pages.raptorAms.click('questionContent');
    await pages.raptorAlgos.click('variables');
  });

When(/^I click on List Variable button, list algos table is added$/, async function () {
    await pages.raptorAlgos.click('algosButton', '+ List Variable');
    await pages.raptorAlgos.assertElementExists('variableName1List');
  });

  When(/^I click on Add Column and Delete Column buttons, list column is added and deleted respectively$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Add Column');
    await pages.raptorAlgos.assertElementExists('row1Column2List');
    await pages.raptorAlgos.click('algosButton', 'Value 2');
    await pages.raptorAlgos.assertElementDoesNotExist('row1Column2List');
  });

  When(/^I click on Add Row and Delete Row buttons, list row is added and deleted respectively$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Add Row');
    await pages.raptorAlgos.assertElementExists('row2List');
    await pages.raptorAlgos.click('row2ListDelete');
    await pages.raptorAlgos.assertElementDoesNotExist('row2List');
  });

  When(/^I click on Remove Table button, list algos table is deleted$/, async function () {
    await pages.raptorAlgos.click('algosButton', 'Remove Table');
    await pages.raptorAlgos.assertElementDoesNotExist('variableName1List');
  });

  When(/^I add a list column and input values "(.*)", "(.*)" and "(.*)"$/, async function (col1, col2, col3) {
    await pages.raptorAlgos.click('algosButton', 'Add Column');
    await pages.raptorAlgos.assertElementExists('row1Column2List');
    await pages.raptorAlgos.click('algosButton', 'Add Column');
    await pages.raptorAlgos.assertElementExists('row1Column3List');
    await pages.raptorAlgos.populate('variableName1ListValue', 'list1');
    
    await pages.raptorAlgos.populate('row1Column1ListValue', col1);
    this.data.set('col1', col1);
    await pages.raptorAlgos.populate('row1Column2ListValue', col2);
    this.data.set('col2', col2);
    await pages.raptorAlgos.populate('row1Column3ListValue', col3);
    this.data.set('col2', col2);
    await pages.raptorAlgos.click('row1Column1ListNumber')
  });

  When(/^I add MEE module and input the list algos variable$/, async function () {
    await pages.raptorAms.click('menuBarAdd');
    await pages.raptorAms.assertElementExists('addMathEquation');
    await pages.raptorAms.click('addMathEquation');
    await pages.raptorAms.assertElementExists('contextTab', 'correct');
    await pages.raptorAms.click('questionContent');
    await pages.raptorAms.assertElementExists('answerLabel');
    await pages.raptorAms.click('questionEdit');
    await pages.raptorAms.populate('labelInput', '???list1???');
    await pages.raptorAms.click('contextTab', 'correct');
    await pages.raptorAms.assertElementExists('contextTab', 'correct');
    await pages.raptorAms.click('correctSetup');
    await pages.raptorAms.populate('mathEquationField', '???list1???');
  });

  When(/^I click cycle variables, I verify the list input values and verify there are no question tags$/, async function(){
    for( let i = 1; i <=4 ; i++) {
      await pages.raptorAlgos.click('cycleVariables');
    }
    authortext = await pages.raptorAms.getText('authorCanvas');
    labelText = await pages.raptorAms.getText('authorLabel')

    authortextVal = authortext.split(`$$`)[1];
    let col1 = this.data.get('col1');
    let col2 = this.data.get('col2');
    let col3 = this.data.get('col3');

    
    expect(authortextVal).to.be.oneOf([col1, col2, col3]);
    expect(labelText).to.be.oneOf([col1, col2, col3]);
    expect(authortextVal).does.not.include('???');
    expect(labelText).does.not.include('???');
  });
