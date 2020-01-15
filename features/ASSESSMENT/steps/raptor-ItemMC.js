const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { log } = require(`${process.cwd()}/app/logger`);
const { raptorlib, amslib, froalalib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { assert, expect } = require('chai');

When('I add the following choices in Multiple Choice module', async function (datatable) {
    await pages.raptorItemMC.click('Raptor Canvas Btns', 'edit-module-button');
    for (let i = 0; i < datatable.rows().length; i++) {
      if (i > 1) {
        await pages.raptorItemMC.click('Add Choice Button');
      }
      await pages.raptorItemMC.populate('Choice Value Textbox', i + 1, datatable.hashes()[i].Value);
    }
    await pages.raptorItemMC.click('Editor Panel Done Button');
  });
  Then(/^I preview the item created with rendered variable values$/, async function () {
    let i = 1;
    let case_oak = false;
    let case_pine = false;
    let case_beech = false;
    while (i <= 20) {
        await pages.raptorItemMC.click('Cycle Variables Button');
        let text = await pages.raptor.getText('Answer Radio Button 1', '1');
        switch (text) {
            case "oak":
                log.info(`Correct value rendered "${text}". PASS`);
                case_oak = true;
                break;
            case "pine":
                log.info(`Correct value rendered "${text}". PASS`);
                case_pine = true;
                break;
            case "beech":
                log.info(`Correct value rendered "${text}". PASS`);
                case_beech = true;
                break;
            default:
                await pages.raptor.assertElementExists(text);
        }
        i++;
    }
    let allValuesRendered = ((case_oak == true && case_pine == true) && case_beech == true);
    log.info(`Executed All cases "${allValuesRendered}". PASS`);
    expect(allValuesRendered).to.equal(true);
});
  