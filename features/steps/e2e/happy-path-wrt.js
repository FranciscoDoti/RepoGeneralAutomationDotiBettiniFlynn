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
// var FieldValues;

let pages = {
  authProducer: new PageObject('auth-media-producer.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  authInstructor: new PageObject('auth-instructor.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  student: new PageObject('student-role.json', stepsPath)

}
When('I click on create course plus button', async function () {
  try {
    log.debug('Clicking on create course button');
    await pages.authProducer.populate('Plus_button', 'click');
    log.debug(`create course button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

// When('saving the values to variable', async function (dataTable) {
//   FieldValues = dataTable;
// });

When('I elect to create a course for writing with the following data:', async function (dataTable) {
  var FieldValues = dataTable;
  try {
    log.info(FieldValues.rows().length);
    var x;
    for (x = 0; x < FieldValues.rows().length; x++) {
      log.info(FieldValues.hashes()[x].variable);
      log.info(FieldValues.hashes()[x].values);
      await pages.authProducer.populate(FieldValues.hashes()[x].variable, FieldValues.hashes()[x].values);
    }
  } catch (err) {
    log.error(err.stack);
  }
  try {
    log.debug('Clicking on save button');
    await pages.authProducer.populate('save_button', 'click');
    log.debug(`create course button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on course card and Resource tab', async function () {
  try {
    log.debug('Clicking on course card');
    await pages.authProducer.populate('course_card_2', 'click', 'Resource_tab_writing');
    log.debug(`course card button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on resources tab');
    await pages.authProducer.populate('Resource_tab_writing', 'click');
    log.debug(`create resource tab was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name_writing', 'Chapter 1');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name_writing', 'Chapter 2');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I add the content in the chapters', async function () {
  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name_writing', 'Chapter 1: Peer Review');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name_writing', 'Chapter 2:Instructor Review');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I reorder the content', async function () {
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter 2_Intstructor Review');
    await pages.authProducer.populate('chapter_2_InstructorReview_writing', 'click');
    log.debug(`Chapter 2 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter 2');
    await pages.authProducer.populate('placefolder_writing', 'click');
    log.debug(`Chapter 2 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
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
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter1:Peer review');
    await pages.authProducer.populate('chapter1_peerReview', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter 1');
    await pages.authProducer.populate('placefolder_writing', 'click');
    log.debug(`Chapter 2 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
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
  await sleep(5000);
});

When('I click on open menu for skills template', async function () {
  try {
    log.debug('Clicking on edit button');
    await pages.authProducer.populate('edit_button_writing', 'click');
    log.debug(`edit_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
