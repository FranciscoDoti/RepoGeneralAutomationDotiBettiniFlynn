const { When, Then } = require("cucumber");
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const {
  raptorlib,
  amslib,
  froalalib,
} = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { assert } = require("chai");

When(/^I add the "(.*)" module with following details$/, async function (
  moduleType,
  dataTable
) {
  await amslib.addRaptorItem();
  await raptorlib.addModule(moduleType);
  var rows = dataTable.hashes();
  await pages.raptor.click("Module Chemical Equation Edit", 1);
  await pages.chemicalEquation.populate("Prefix", rows[0].value);
  await pages.raptor.click("Tab", "correct");
  await pages.raptor.click("Module Chemical Equation Correct Setup", 1);
  await pages.chemicalEquation.populate("Answer Input", rows[1].value);
});

When(/^I add the "(.*)" module "(.*)" times$/, async function (
  moduleType,
  times
) {
  await pages.ams.click("Add Item", "Raptor");
  await pages.raptor.switchToTab("Raptor Authoring");
  for (let i = 0; i < times; i++) {
    await raptorlib.addModule(moduleType);
  }
});

When("I duplicate the following items", async function (dataTable) {
  for (let i = 0; i < dataTable.rows().length; i++) {
    let item = dataTable.hashes()[i];
    let itemTitle = this.data.get(item.Title).id;
    let duplicatedItemId = await amslib.duplicateItem(itemTitle);
    if (duplicatedItemId == "" || duplicatedItemId === undefined) {
      assert.fail("Duplicate Item Id is blank.");
    }
    this.data.set(item.Title, { id: duplicatedItemId });
    await pages.ams.closeTab("Raptor Authoring");
    await pages.ams.switchToTab("Sapling Learning Author Management System");
  }
});

When(
  "I create a non-performance module in AMS with the following details",
  async function (datatable) {
    await amslib.addRaptorItem();
    let item = datatable.hashes()[0];
    await raptorlib.addItemDetails(item);
    await raptorlib.addModule(item["Module Type"]);

    let itemId = await raptorlib.saveItem();
    this.data.set(item.Title, { id: itemId });
  }
);

When(/^I add the "(.*)" module$/, async function (moduleType) {
  await amslib.addRaptorItem();
  await raptorlib.addModule(moduleType);
});

Then("I verify item has been created", async function () {
  let itemid = await raptorlib.saveItem();
  await pages.raptor.switchToTab("Sapling Learning");
  await pages.raptor.assertElementExists("amsItemCreate", itemid.trim());
});

Then("I verify item has been created with following details", async function (
  dataTable
) {
  let itemid = await raptorlib.saveItem();
  await pages.raptor.switchToTab("Sapling Learning");
  await amslib.waitAlgoliaProcess();
  await pages.raptor.assertElementExists("amsItemCreate", itemid.trim());
  var rows = dataTable.hashes();
  for (let i = 0; i < dataTable.rows().length; i++) {
    let field = await rows[i].field;
    field = field.replace(" ", "_");
    let value = await rows[i].value;
    let modulelocator = field + "-" + itemid;
    await pages.raptor.assertText("raptormoduleType", modulelocator, value);
  }
});

When("I configure the following item details", async function (datatable) {
  let item = datatable.hashes()[0];
  await raptorlib.addItemDetails(item);
  let itemId = await raptorlib.saveItem();
  this.data.set(item.Title, { id: itemId });
});

When("I add list variables", async function (datatable) {
  await pages.raptor.click("variablesChevron");
  await pages.raptor.click("addListVariableButton");

  for (let col = 1; col < datatable.rows()[0].length - 3; col++) {
    await pages.raptor.click("addColumnButton");
  }

  for (let row = 1; row < datatable.rows().length; row++) {
    await pages.raptor.click("addRowButton");
  }

  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.raptor.populate(
      "variableNameTextbox",
      i + 1,
      datatable.hashes()[i].Name
    );
    await pages.raptor.populate(
      "variableValue1Textbox",
      i + 1,
      datatable.hashes()[i].Value1
    );
    await pages.raptor.populate(
      "variableValue2Textbox",
      i + 1,
      datatable.hashes()[i].Value2
    );
    if (datatable.hashes()[i].Value3 !== undefined) {
      await pages.raptor.populate(
        "variableValue3Textbox",
        i + 1,
        datatable.hashes()[i].Value3
      );
    }
    await pages.raptor.populate(
      "variableTypeDropdown",
      i + 1,
      datatable.hashes()[i].Type
    );
  }
});

When("I add the following range algos", async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.raptor.click("addRangeAlgoButton");
    await pages.raptor.populate(
      "Range Algo Desc Field",
      i * 2 + 1,
      datatable.hashes()[i].Description
    );
    await pages.raptor.populate("rangeNameTextbox", i * 2 + 1, "");
    await pages.raptor.populate(
      "rangeNameTextbox",
      i * 2 + 1,
      datatable.hashes()[i]["Variable Name"]
    );
    await pages.raptor.populate(
      "rangeMinimumTextbox",
      i * 2 + 1,
      datatable.hashes()[i]["Minimum Value"]
    );
    await pages.raptor.populate(
      "rangeMaximumTextbox",
      i * 2 + 1,
      datatable.hashes()[i]["Maxmimum Value"]
    );
    await pages.raptor.populate(
      "rangeIncrementTextbox",
      i * 2 + 1,
      datatable.hashes()[i]["Increment Step"]
    );
  }
});

When("I add the following calculated algos", async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    await pages.raptor.click("addCalculatedAlgoButton");
    await pages.raptor.populate("calculatedNameTextbox", i * 2 + 1, "");
    await pages.raptor.populate(
      "calculatedNameTextbox",
      i * 2 + 1,
      datatable.hashes()[i].Name
    );
    await pages.raptor.populate(
      "calculatedEquationTextbox",
      i * 2 + 1,
      datatable.hashes()[i].Equation
    );
  }
});

When(/^I set correct answer "(.*)" for NE "(.*)"$/, async function (
  value,
  position
) {
  let selectedTabText = await pages.raptor.getText("Active Tab Edit Mode");
  if (selectedTabText !== "correct1") {
    await pages.raptor.click("Tab", "correct");
  }
  await pages.numericEntry.click("Element", position);
  await pages.raptor.click("Raptor Canvas Btns", "edit-module-button");
  await pages.numericEntry.populate("Target Value", "1", value);
});

When("I configure FR module", async function () {
  await pages.raptor.click("Raptor Canvas Btns", "edit-module-button");
  await pages.freeResponse.populate(
    "Prompt",
    '<md-never><img src="http://www.filmbuffonline.com/FBOLNewsreel/wordpress/wp-content/uploads/2014/07/nic-cage.jpg" alt="" style="width: 100%"/></md-never>'
  );
  await pages.freeResponse.populate("Min Character Count", "20");
  await pages.freeResponse.populate("Max Character Count", "40");
});

Then("I check NE answers", async function () {
  await raptorlib.saveItem();
  await raptorlib.checkAnswerMode();
  await pages.numericEntry.populate("Element", "1", ".0258");
  await pages.numericEntry.populate("Element", "2", "-0.0258");
  await pages.raptor.click("Check Your Work Submit Button");
  await pages.raptor.assertText("activeTabTakeMode", "correct1");
});

Then("I check FR answers", async function () {
  await raptorlib.saveItem();
  await raptorlib.checkAnswerMode();
  await pages.freeResponse.populate(
    "Element Take Mode",
    "123456789012345678901"
  );
  await pages.raptor.click("Check Your Work Submit Button");
  await pages.raptor.assertText("activeTabTakeMode", "correct1");
});

When(/^I add the (.*) draft item in AMS with title (.*)$/, async function (
  moduleType,
  title
) {
  await amslib.addRaptorItem();
  await raptorlib.addModule(moduleType);
  await raptorlib.addItemDetails({ Title: title });
});

When("I add the following feedbacks and save the item", async function (
  feedbackDetail
) {
  await pages.raptor.click("Add Context", "incorrect");
  for (let i = 0; i < feedbackDetail.rows().length; i++) {
    let data = feedbackDetail.hashes()[i];
    await raptorlib.addFeedbackModule(data["Tab Name"], "Ungraded Text");
    await froalalib.addFeedback(data);
  }
  let itemId = await raptorlib.saveItem();
  this.data.set("itemId", itemId);
  await pages.ams.closeTab("Raptor Authoring");
});

Then(/^I verify the feedbacks in the following tabs$/, async function (
  datatable
) {
  await amslib.waitAlgoliaProcess();
  await pages.ams.click("Item Action", "preview-" + this.data.get("itemId"));
  await pages.ams.click("Show Feedback Toggle");
  for (let i = 0; i < datatable.rows().length; i++) {
    let itemTabs = datatable.hashes()[i];
    await amslib.verifyFeedback(itemTabs);
  }
});

When("I add hints", async function (datatable) {
  for (let i = 0; i < datatable.rows().length; i++) {
    let hint = datatable.hashes()[i];
    await raptorlib.addHint(hint["Module Type"], hint["Value"]);
  }
});

When("I click on Check Your Work and Submit Answer", async function () {
  await raptorlib.checkAnswerMode();
  await raptorlib.submitAnswer();
});

When("I Verify the Ungraded Text in current context", async function (
  datatable
) {
  for (let i = 0; i < datatable.rows().length; i++) {
    let item = datatable.hashes()[i];
    await pages.raptor.assertElementExists(
      "Feedback Ungraded Text Check",
      item["Text"]
    );
  }
});

When(
  "I set the following feedbacks with respect to the contexts",
  async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
      let item = datatable.hashes()[i];
      switch (item["Context"]) {
        case "Incorrect":
          await pages.raptor.click("Add Context", "incorrect");
          break;
        case "Correct":
          await pages.raptor.click(i === 0 ? "Tab" : "Add Context", "correct");
          break;
        case "Default":
          await pages.raptor.click("Tab", "default");
          break;
      }
      await raptorlib.addHint(item["Hint Type"], item["Value"]);
    }
  }
);
