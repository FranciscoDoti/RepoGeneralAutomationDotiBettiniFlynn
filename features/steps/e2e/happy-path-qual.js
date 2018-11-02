const {When, Then} = require('cucumber');
const path = require('path');
const {loadConfig, loadLogin} = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const parse = require('parse-duration');
const ScenarioData = require('../../../app/scenarioData');
const StringProcessing = require('../../../app/stringProcessing');
const {getDriver, sleep} = require('../../../app/driver');
const { By} = require('selenium-webdriver');
const {Key} = require('selenium-webdriver');
const fs = require('fs');

let pages = {
  authProducer: new PageObject('auth-media-producer.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  authInstructor: new PageObject('auth-instructor.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  student: new PageObject('student-role.json', stepsPath)

}

When('I click on course card "Qual Testcourse" template', async function () {
  try {
    log.debug('Clicking on course card of Qual');
    await pages.authProducer.populate('card_name_Qual', 'click', 'resources_tab');
    log.debug(`create course card was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on Add folder button for adding folder', async function () {
  try {
    log.debug('Clicking on add folder button');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`Add folder button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then(/^I create a folder with the name "(.*)"$/, async function (FolderName) {
  try {
    log.debug('Clicking on folder name button');
    await pages.authProducer.populate('folder_name', FolderName);
    log.debug(`FOlder name was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on add folder button in order to save it', async function () {
  try {
    log.debug('Clicking on Add folder button');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`add folder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await sleep(5000);
});

Then('I reorder the chapters in resource page', async function () {
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking reorder button');
    await pages.authProducer.populate('reorder_button', 'click');
    log.debug(`Reorder button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move down button');
    await pages.authProducer.populate('move_total_down_button', 'click');
    log.debug(`Move down button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking save button');
    await pages.authProducer.populate('save_reordered_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking reorder button');
    await pages.authProducer.populate('reorder_button', 'click');
    log.debug(`Reorder button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move down button');
    await pages.authProducer.populate('move_down_button', 'click');
    log.debug(`Move down button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking save button');
    await pages.authProducer.populate('save_reordered_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button_2', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking reorder button');
    await pages.authProducer.populate('reorder_button', 'click');
    log.debug(`Reorder button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move down button');
    await pages.authProducer.populate('move_down_button', 'click');
    log.debug(`Move down button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking save button');
    await pages.authProducer.populate('save_reordered_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button_2', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking reorder button');
    await pages.authProducer.populate('reorder_button', 'click');
    log.debug(`Reorder button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking move up button');
    await pages.authProducer.populate('move_up_button', 'click');
    log.debug(`Move down button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking save button');
    await pages.authProducer.populate('save_reordered_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I move the activities to the chapters assigned to it', async function () {
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter1', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter1', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter2', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter2', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter2', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter2', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter2', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter3', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter3', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter4', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open action menu');
    await pages.authProducer.populate('OpenActionMenu', 'click');
    log.debug(`Open action menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Reorder button');
    await pages.authProducer.populate('Reorder_Assesment', 'click');
    log.debug(`Reorder button  was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on activity content and place in respective chapters');
    await pages.authProducer.populate('Place_activity_chapter4', 'click');
    log.debug(`RActivities are placed in respective chapters: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
