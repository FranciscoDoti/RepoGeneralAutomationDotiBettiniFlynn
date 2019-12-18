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

async function closeAlert () {
  await gradebook.waitForElementVisibility('alertCloseBtn');
  await sleep(2000); // Wait for animation
  await gradebook.click('alertCloseBtn');
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
  await closeAlert();
}

async function disconnectFromIClicker () {
  await openIClickerMenu();
  // await sleep(2000); // Wait for animation
  await iclicker.click('iClickerMenuDisconnect');
  await iclicker.waitForElementVisibility('confirmDisconnectButton');
  await iclicker.click('confirmDisconnectButton');
  await closeAlert();
}

async function openIClickerMenu () {
  await iclicker.waitForElementVisibility('iClickerMenu');
  await iclicker.click('iClickerMenu');
  await iclicker.waitForElementVisibility('iClickerMenuDisconnect');
}

When('Instructor opens the settings modal', async function () {
  await waitForSettings();
  await gradebook.click('settingsNav');
})

When('Instructor connects to iClicker', async function () {
  await waitForSettings();
  const connected = await isConnected();
  if (connected) {
    await disconnectFromIClicker();
    await sleep(3000);
  }
  await connectToiClicker();
});

When('Instructor connects or stays connected to iClicker', async function () {
  await waitForSettings();
  const connected = await isConnected();
  if (!connected) {
    await connectToiClicker();
  }
  await sleep(5000);
});

When('Instructor disconnects to iClicker', async function () {
  await waitForSettings();
  const connected = await isConnected();
  if (connected) {
    await disconnectFromIClicker();
  }

});

module.exports = {
  openIClickerMenu
};
