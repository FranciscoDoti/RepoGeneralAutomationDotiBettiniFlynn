const { When } = require('cucumber');
const { iclicker, gradebook, iclickerCourses } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);

function waitForSettings () {
  return gradebook.waitForElementVisibility('settingsNav');
}

async function isConnected () {
  const text = await iclicker.getText('iClickerMenuText');
  return text === 'iClicker';
}

async function connectToiClicker () {
  await iclicker.click('syncIClicker');
  await iclicker.waitForElementVisibility('usernameInput');
  await iclicker.populate('usernameInput', 'keith.blanchard.contractor+gbk_test_automation@macmillan.com');
  await iclicker.populate('passwordInput', 'Passw0rd!');
  await iclicker.click('signInButton');
  await iclickerCourses.waitForElementVisibility('iclickerCourse1');
  await iclickerCourses.click('iclickerCourse1');
  await iclicker.waitForElementVisibility('saveAndLinkCourses');
  await iclicker.click('saveAndLinkCourses');
  await gradebook.waitForElementVisibility('alertCloseBtn');
  await gradebook.click('alertCloseBtn');
}

async function disconnectFromIClicker () {
  await iclicker.click('iClickerMenu');
  await iclicker.waitForElementVisibility('iClickerMenuDisconnect');
  await iclicker.click('iClickerMenuDisconnect');
  await iclicker.waitForElementVisibility('confirmDisconnectButton');
  await sleep(5000);
  await iclicker.click('confirmDisconnectButton');
  await gradebook.waitForElementVisibility('alertCloseBtn');
  await gradebook.click('alertCloseBtn');
}

When('Instructor opens the settings modal', async function waitForSettings () {
  await waitForSettings();
  await gradebook.click('settingsNav');
})

When('Instructor connects to iClicker', async function () {
  await waitForSettings();
  const connected = await isConnected();
  if (connected) {
    await disconnectFromIClicker();
    await sleep(5000);
  }
  await connectToiClicker()
});

When('Instructor disconnects to iClicker', async function () {
  await waitForSettings();
  const connected = await isConnected();
  if (!connected) {
    await connectToiClicker();
    await sleep(5000);
  }
  await disconnectFromIClicker();
});
