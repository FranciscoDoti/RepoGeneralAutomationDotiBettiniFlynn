const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep, getDriver } = require(`${process.cwd()}/app/driver`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I click the link to Mol3d assessment', async function () {
  await visitURL('http://www.saplinglearning.com/ibiscms/mod/flcn/view.php?id=9246108');
  await pages.saplingLearning.click('studentPreviewButton');
  await pages.saplingLearning.click('clearAttemptsButton');

  var tabs = await getDriver().getAllWindowHandles();
  await getDriver().switchTo().window(tabs[tabs.length - 1]);
  var tabName = await getDriver().getTitle();
  log.info(`switching to tab "${tabName}"`);
  await sleep(5000);
});

When('I click the link to Mol3d standalone', async function () {
  await pages.saplingLearning.click('mol3dStandaloneLink');
  await sleep(5000);
});

Then('the Mol3d applet loads without errors', async function () {
  await pages.mol3d.assertElementExists('mol3d');
  await pages.mol3d.assertElementExists('savi-mol3d-body');
  await pages.mol3d.assertElementExists('savi-jmol-menu');

  log.info('Checking for Jmol errors');
  let jmolConsole = await pages.mol3d.getWebElements('jmolConsole');
  let errors = [];
  log.debug('---- Jmol console output: ----');
  for (let i = 0; i < jmolConsole.length; i++) {
    let text = await jmolConsole[i].getAttribute('innerHTML');
    if (text.toLowerCase().includes('error:')) {
      let next = await jmolConsole[i + 1].getAttribute('innerHTML');
      errors.push(`${text} ${next}`);
    }
    log.debug(text);
  }
  log.debug('----------------------');
  for (let e in errors) {
    log.error(`Jmol: ${errors[e]}`);
  }
  console.log(errors.length)
  if (await expect(errors.length).to.equal(0)) {
    log.info(`${errors.length} errors found in Jmol console. PASS`);
    await sleep(5000);
  }
});

Then('I can click all the menu buttons', async function () {
  // check toolbar buttons exist
  await pages.mol3d.assertElementExists('rotateX');
  await pages.mol3d.assertElementExists('rotateY');
  await pages.mol3d.assertElementExists('rotateZ');
  await pages.mol3d.assertElementExists('zoomIn');
  await pages.mol3d.assertElementExists('zoomOut');
  await pages.mol3d.assertElementExists('toggleLabels');

  // // click all toolbar buttons
  await pages.mol3d.click('rotateX');
  await sleep(1000);
  await pages.mol3d.click('rotateX');
  await pages.mol3d.click('rotateY');
  await sleep(1000);
  await pages.mol3d.click('rotateY');
  await pages.mol3d.click('rotateZ');
  await sleep(1000);
  await pages.mol3d.click('rotateZ');
  await pages.mol3d.click('zoomIn');
  await sleep(1000);
  await pages.mol3d.click('zoomOut');
  await sleep(1000);
  await pages.mol3d.click('toggleLabels');
  await sleep(1000);
  await pages.mol3d.click('toggleLabels');
  await sleep(1000);
});

When('I click the link to Mol3d standalone with invalid molecule file parameter', async function () {
  await pages.saplingLearning.click('mol3dStandaloneLinkError');
  await sleep(5000);
});

Then('the Mol3d applet reports {int} errors', async function (numErrors) {
  log.info('Checking for Jmol errors');
  let jmolConsole = await pages.mol3d.getWebElements('jmolConsole');
  let errors = [];
  log.debug('---- Jmol console output: ----');
  for (let i = 0; i < jmolConsole.length; i++) {
    let text = await jmolConsole[i].getAttribute('innerHTML');
    if (text.toLowerCase().includes('error:')) {
      let next = await jmolConsole[i + 1].getAttribute('innerHTML');
      errors.push(`${text} ${next}`);
    }
    log.debug(text);
  }
  log.debug('----------------------');
  for (let e in errors) {
    log.error(`Jmol: ${errors[e]}`);
  }
  if (await expect(errors.length).to.equal(numErrors)) {
    log.info(`${numErrors} errors expected in Jmol console. ${errors.length} errors found. PASS`);
  //  await sleep(5000);
  }
});

When('I click the link to Mol3d standalone using Pubchem smile identifier', async function () {
  await pages.saplingLearning.click('mol3dSmile');
  await sleep(5000);
});

When('I click the link to Mol3d standalone using Pubchem name identifier', async function () {
  await pages.saplingLearning.click('mol3dWater');
  await sleep(5000);
});

When('I click the link to Mol3d standalone using NIH Cactus identifier', async function () {
  await pages.saplingLearning.click('mol3dCactus');
  await sleep(5000);
});

When('I click the link to Mol3d standalone using RCSB Protein in Data Bank identifier', async function () {
  await pages.saplingLearning.click('mol3dProtein');
  await sleep(5000);
});



