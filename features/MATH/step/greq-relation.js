
const { When } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const { Key } = require('selenium-webdriver')

When(/^I set the grade as Relation type and input "(.*)" equation$/, async function (eval) {
  let qa = new selenium(this.driver);
  let evalGrade = require(`../_data/${eval}.json`);
  await qa.exists(page.math.raptorAms.correctTab);
  await qa.click(page.math.raptorAms.correctTab);
  await qa.input(page.math.raptorAms.gradeAs, 'Relation');
  await qa.click(page.math.raptorAms.gradeAs);
  await qa.sendKeys(page.math.raptorAms.equationField, Key.RETURN)
  await qa.sendKeys(page.math.raptorAms.equationField, Key.BACK_SPACE)
  await qa.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[1].value='${evalGrade.EvalQ1.Equation}'; ta[1].dispatchEvent(new Event('input'))`);
  await qa.sendKeys(page.math.raptorAms.prefixField, Key.RETURN)
  await qa.sendKeys(page.math.raptorAms.prefixField, Key.BACK_SPACE)
  await qa.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[0].value='${evalGrade.EvalQ1.Equation}'; ta[0].dispatchEvent(new Event('input'))`);
});
