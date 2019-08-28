const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

When("I change the grading setting to completion", async function () {
  await pages.instructorAssignment.click('Change Grading Settings Button');
  await pages.instructorAssignment.assertElementExists('Grading Settings Save Button');
  await pages.instructorAssignment.assertElementExists('Grading Settings Cancel Button');
  await pages.instructorAssignment.click('Completion Toggle Button');
  await pages.instructorAssignment.click('Grading Settings Save Button');
  await pages.instructorAssignment.assertElementExists('Confirm Save Modal', 'Grading setting changed');
  await pages.instructorAssignment.click('Grading Settings Changed Modal Ok Button');
});

When("I change the grading setting to performance", async function () {
  await pages.instructorAssignment.click('Change Grading Settings Button');
  await pages.instructorAssignment.assertElementExists('Grading Settings Save Button');
  await pages.instructorAssignment.assertElementExists('Grading Settings Cancel Button');
  await pages.instructorAssignment.click('Performance Toggle Button');
  await pages.instructorAssignment.click('Grading Settings Save Button');
  await pages.instructorAssignment.assertElementExists('Confirm Save Modal', 'Grading setting changed');
  await pages.instructorAssignment.click('Grading Settings Changed Modal Ok Button');
});

When("I set a late penalty", async function () {
  await pages.instructorAssignment.click('Late Penalty Button');
  await pages.instructorAssignment.assertElementExists('Late Penalty Save Button');
  await pages.instructorAssignment.assertElementExists('Late Penalty Cancel Button');
  await pages.instructorAssignment.click('Late Penalty Toggle Button');
  await pages.instructorAssignment.click('Late Penalty Save Button');
  await pages.instructorAssignment.assertElementExists('Penalty Warning Confirm Modal', 'Do you want to confirm these changes');
  await pages.instructorAssignment.click('Late Penalty Confirm Button');
  await pages.instructorAssignment.assertElementExists('Penalty Warning Confirm Modal', 'Late Penalty Changes Saved');
  await pages.instructorAssignment.click('Late Penalty Confirmation Modal Cancel Button')
});

When("I set no late penalty", async function () {
  await pages.instructorAssignment.click('Late Penalty Button');
  await pages.instructorAssignment.assertElementExists('Late Penalty Save Button');
  await pages.instructorAssignment.assertElementExists('Late Penalty Cancel Button');
  await pages.instructorAssignment.click('No Late Penalty Toggle Button');
  await pages.instructorAssignment.click('Late Penalty Save Button');
  await pages.instructorAssignment.assertElementExists('Penalty Warning Confirm Modal', 'Do you want to confirm these changes');
  await pages.instructorAssignment.click('Late Penalty Confirm Button');
  await pages.instructorAssignment.assertElementExists('Penalty Warning Confirm Modal', 'Late Penalty Changes Saved');
  await pages.instructorAssignment.click('Late Penalty Confirmation Modal Cancel Button')
});
