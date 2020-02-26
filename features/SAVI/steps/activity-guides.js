const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep } = require(`${process.cwd()}/app/driver`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I navigate to the activity guide demo master link', async function () {
  // this sets the prod cookie, allowing any prod links within the guides to work
  await pages.saplingLearning.click('saviLoaderProdLink');
  await visitURL('https://www.saplinglearning.com/ibiscms/course/view.php?id=77826');
  await pages.saplingLearning.click('activityGuideDemoLink');
  console.log('loading demo');
});

Then('the activity guide loads', async function () {
  await pages.activityguide.assertElementExists('recipecard');
});

Then('all of the activity guide links can be loaded from {string}', async function (json) {
  console.log('json', json);
  const data = require(`${process.cwd()}/features/SAVI/data/${json}`);
  const urls = [];
  data.forEach(async (activity) => {
    urls.push(activity.url);
  });
  const success = [];
  const fail = [];
  const brokenLinks = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    await visitURL(url);
    const recipecard = await pages.activityguide.getWebElements('recipecard');
    if (recipecard.length) {
      success.push(url);
      log.info('Web Element recipecard is displayed on page. PASS');
      // Here we check if all links on the page are working...
      // First get all link elements on the page
      const links = await pages.activityguide.getWebElements('links');
      log.info(`${links.length} links found`);
      const linkInfo = [];
      const map = new Map();
      for (let l = 0; l < links.length; l++) {
        const link = links[l];
        const href = await link.getAttribute('href');
        const html = await link.getAttribute('innerHTML');
        const target = await link.getAttribute('target');
        const disabled = await link.getAttribute('disabled');
        if (!map.has(href) && !disabled) { // skip duplicate hrefs and disabled links
          map.set(href, true);
          linkInfo.push({
            id: l,
            html,
            href,
            target,
            disabled
          });
        }
      };
      console.log(linkInfo);
      for (let u = 0; u < linkInfo.length; u++) {
        const hrefTest = linkInfo[u].href;
        log.info(`Visiting the link path: ${hrefTest}`);
        await visitURL(hrefTest);
        // check for broken link
        const brokenLinkPage = await pages.activityguide.checkElementExists('brokenLinkPage');
        if (brokenLinkPage) {
          brokenLinks.push(hrefTest);
        }
      }
    } else {
      fail.push(url);
      log.error('Web Element recipecard not found on page. FAIL');
    }
  }
  if (fail.length) {
    log.error(`THE FOLLOWING ${fail.length} PAGE(S) FAILED:`);
    for (var item in fail) {
      log.error(fail[item]);
    }
  } else {
    if (success.length) {
      log.info(`"${success.length}" page loaded! PASS`);
    } else {
      log.info(`All "${success.length}" pages loaded! PASS`);
    }
  }
  if (brokenLinks.length) {
    log.error(`THE FOLLOWING ${brokenLinks.length} BROKEN LINKS WERE FOUND:`);
    for (var b in brokenLinks) {
      log.error(brokenLinks[b]);
    }
  } else {
    log.info('No broken links found. PASS');
  }
  await expect(fail.length).to.equal(0);
  await expect(brokenLinks.length).to.equal(0);
});
