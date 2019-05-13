
const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

When(/^I click Edit under Topic section in Item Details window$/, async function () {
    await pages.raptorAms.click('moreMenuBar');
    await pages.raptorAms.click('moreItemDetails');
    await pages.raptorAms.click('itemDetailsTopicEdit');
});

Then(/^the subjects are displayed$/, async function () {
    await qa.exists(`${page.raptorAms.topic} [title='Algebra']`);
    await qa.exists(`${page.raptorAms.topic} [title='Astronomy']`);
    await qa.exists(`${page.raptorAms.topic} [title='Biochemistry']`);
    await qa.exists(`${page.raptorAms.topic} [title='Biology']`);
    await qa.exists(`${page.raptorAms.topic} [title='Calculus']`);
    await qa.exists(`${page.raptorAms.topic} [title='English']`);
    await qa.exists(`${page.raptorAms.topic} [title='Geography']`);
});

// When(/^I select Rogawski 5.3 section under Calculus and confirm$/, async function () {
//     let qa = new selenium(this.driver);
   
//     await qa.click(`${page.math.raptorAms.topic} [title = 'Calculus']`);
//     await qa.click(page.math.raptorAms.topicRogawski);
//     await qa.click(`${page.math.raptorAms.topicIntegration} 'Chapter 5: Integration']` );
//     await qa.click(`${page.math.raptorAms.topicIntegration} '5.3 The Indefinite Integral']`);
//     await qa.click(page.math.raptorAms.topicSection5);
//     await qa.click(page.math.raptorAms.topicConfirmButton);
// });

Then(/^I verify the selected section shows under the Topic category and submit Item Details$/, async function () {
    await page.raptorAms.assertElementExists('confirmTopicQs',"Section 5.3 Questions_ID 47511 (Rog4e)");
    await page.raptorAms.click('itemDetailsSubmit');
});