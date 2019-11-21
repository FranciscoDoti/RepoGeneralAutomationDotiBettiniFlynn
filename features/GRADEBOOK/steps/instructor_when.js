const { When } = require('cucumber');

const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const {getCategoryName} = require('../data/test_value_generator');

When('Instructor toggle percents', async function () {
  await pages.gradebook.waitForElementVisibility('percentsToggleButton');
  await pages.gradebook.click('percentsToggleButton');
});

When('Instructor toggle points', async function () {
  await pages.gradebook.waitForElementVisibility('pointsToggleButton');
  await pages.gradebook.click('pointsToggleButton');
});

When('Instructor saves a new category', async function () {
  await pages.settings.waitForElementVisibility('addCategory');
  await pages.settings.click('addCategory');
  await pages.settings.waitForElementVisibility('newCategoryInput');
  const newCategoryName = getCategoryName();
  await pages.settings.populate('newCategoryInput', newCategoryName);
  await pages.settings.click('saveCategory');
});

When('Instructor deletes all categories', async function () {
  await pages.settings.waitForElementVisibility('addCategory');
  const deleteButtons = await pages.settings.getWebElements('removeCategory');
  for (const button of deleteButtons) {
    await button.click();
  }
});

async function waitForSettings () {
  await pages.gradebook.waitForElementVisibility('settingsNav');
  await pages.gradebook.click('settingsNav');
}
When('Instructor opens the settings modal', waitForSettings);

async function connectToiClicker () {
  await pages.gradebook.waitForElementVisibility('syncIClicker');
  await pages.gradebook.click('syncIClicker');
  await pages.iclickerConnect.waitForElementVisibility('usernameInput');
  await pages.iclickerConnect.populate('usernameInput', 'keith.blanchard.contractor+gbk_test_automation@macmillan.com');
  await pages.iclickerConnect.populate('passwordInput', 'Passw0rd!');
  await pages.iclickerConnect.click('signInButton');
}
async function disconnectFromIClicker () {
  await pages.gradebook.click('iClickerMenu');
  await pages.gradebook.waitForElementVisibility('iClickerMenuDisconnect');
  await pages.gradebook.click('iClickerMenuDisconnect');
}

async function isConnected () {
  const iClickerMenu = await pages.gradebook.getWebElements('iClickerMenu');
  return iClickerMenu.length > 0;
}

When('Instructor connects to iClicker', async function () {
  await waitForSettings();
  const iClickerMenu = await pages.gradebook.getWebElements('iClickerMenu');
  if (iClickerMenu.length > 0) {
    await disconnectFromIClicker();
    await connectToiClicker();
  }
  await connectToiClicker()
});

When('Instructor disconnects to iClicker', async function () {
  await waitForSettings();
  if (await isConnected()) {
    await disconnectFromIClicker();
    await connectToiClicker();
  } else {
    await connectToiClicker()
  }
  await disconnectFromIClicker();
});
