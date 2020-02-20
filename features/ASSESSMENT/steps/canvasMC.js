const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;

When('I add the following choices in Multiple Choice module', async function (datatable) {
  //canvas
  await pages.canvasMC.click('Canvas Button', 'Edit');

  //froala editor
  for (let i = 0; i < datatable.rows().length; i++) {
    if (i > 1) {
      await pages.canvasMC.click('Add Choice Button');
    }
    await pages.canvasMC.populate('Choice Value Textbox', i + 1, datatable.hashes()[i].Value);
  }
  await pages.canvasMC.click('Done Button');
});

Then('I verify whether clicking on Cycle Variables updates the choices', async function (datatable) {
  for (let data of datatable.hashes()) {
    for(let counter = 0; counter <= 10; counter++){
      if(await pages.canvasMC.checkElementExists('Answer Radio Button', data.Choice)){
        break;
      }
      await pages.raptor.click('Cycle Variables Button');
      if(counter == 10){
        await pages.canvasMC.assertElementExists('Answer Radio Button', data.Choice);
      }
    }
  }
});

When(/^I set the number "(.*)" as the correct answer$/, async function (answer) {
  await pages.raptor.click('Tab', 'correct');
  await pages.raptor.scrollElementIntoView('Tab', 'correct');
  await pages.canvasMC.click('Answer Radio Button', answer);
});