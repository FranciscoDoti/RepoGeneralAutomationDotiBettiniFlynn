const {When, Then, After} = require('cucumber');
const {loadLogin} = require('../../../app/util');
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const {getDriver, sleep} = require('../../../app/driver');
const {By} = require('selenium-webdriver');
const assert = require('assert');
const config = loadConfig('config');
var countlinks;

let pages = {
  overviewTab: new PageObject('overview-tab.json', coursewareStepsPath)
}

When('I click on course plan in student account', async function () {
  await sleep(5000);
  await pages.overviewTab.populate('course_plan', 'click');
});
When('I click on chapter read and Practice', async function () {
  await sleep(3000);
  await pages.overviewTab.populate('read_practice_chapter1', 'click');
});

Then('I click on the reading material and validate whether the content is available', async function () {
  await getDriver().findElements(By.xpath("//*[@type='checkbox']")).then(function (elems) {
    countlinks = elems.length;
  });
  var i;
  for (i = 1; i <= countlinks; i++) {
    await sleep(3000);
    // await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).isDisplayed();

    await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).click();

    // console.log(await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getAttribute('aria-label') + 'gettext1');
    // var topicName = await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getAttribute('aria-label');
    // var topicArray = topicName.split(':');
    /* var text = topicArray[2];
      var textuppercase = text.toLocaleUpperCase();
      console.log(textuppercase + 'testuppercas');

      //console.log(await getDriver().findElement(By.xpath("//*[text()='"+textuppercase+"']")).isDisplayed()); */

    // console.log( await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getAttribute('aria-label') + 'gettext1');
    // await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).click();
    // console.log(getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getText()+'gettext2');

    /* if (await pages.student.checkWebElementExists('Reading_verification')) {
        console.log('passed');
      } else {
        console.log('failed');
      } */
  }
  // await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + 1 + ']')).click();
  await getDriver().navigate().refresh();
});
