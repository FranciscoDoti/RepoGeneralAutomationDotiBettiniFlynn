
const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');


/* Scenario 1: User creates a Raptor item and sets the topic by a selecting subject section */


When(/^I click Edit under Topic section in Item Details window$/, async function () {
    let qa = new selenium(this.driver);

    await qa.click(page.math.raptorAms.moreMenuBar);
    await qa.click(page.math.raptorAms.moreItemDetails);
    await qa.click(page.math.raptorAms.itemDetailsTopicEdit);
});

Then(/^the subjects are displayed$/, async function () {
    let qa = new selenium(this.driver);

    await qa.exists(`${page.math.raptorAms.topic} [title='Algebra']`);
    await qa.exists(`${page.math.raptorAms.topic} [title='Astronomy']`);
    await qa.exists(`${page.math.raptorAms.topic} [title='Biochemistry']`);
    await qa.exists(`${page.math.raptorAms.topic} [title='Biology']`);
    await qa.exists(`${page.math.raptorAms.topic} [title='Calculus']`);
    await qa.exists(`${page.math.raptorAms.topic} [title='English']`);
    await qa.exists(`${page.math.raptorAms.topic} [title='Geography']`);
});

When(/^I select Rogawski 5.3 section under Calculus and confirm$/, async function () {
    let qa = new selenium(this.driver);
   
    await qa.click(`${page.math.raptorAms.topic} [title = 'Calculus']`);
    await qa.click(page.math.raptorAms.topicRogawski);
    await qa.click(`${page.math.raptorAms.topicIntegration} 'Chapter 5: Integration']` );
    await qa.click(`${page.math.raptorAms.topicIntegration} '5.3 The Indefinite Integral']`);
    await qa.click(page.math.raptorAms.topicSection5);
    await qa.click(page.math.raptorAms.topicConfirmButton);
});

Then(/^I verify the selected section shows under the Topic category and submit Item Details$/, async function () {
    let qa = new selenium(this.driver);

    let confirmQs = await qa.getText(page.math.raptorAms.confirmTopicQs);
    confirmQs.match("Section 5.3 Questions_ID 47511 (Rog4e)");
    await qa.click(page.math.raptorAms.itemDetailsSubmit);
});