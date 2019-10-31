const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
let scores = [];

When('I navigate to assignment preview', async function () {
    await pages.sac.click('Course Link', 'Raptor Automation - Do Not Delete');
    await pages.sac.click('Instructor Assessment Link', 'All Mods');
    await pages.sac.click('Assignment Preview Button');
    await pages.sac.click('Keep Attempts Button');
});

When('I navigate to assignment and go back to the course landing page', async function () {
    await pages.sac.click('Course Link', 'Raptor Automation - Do Not Delete');
    await pages.sac.click('Student Assessment Link');
    await pages.sac.click('Breadcrumb', 'Raptor Automation');
});

Then('The assignment preview is opened in a new tab', async function () {
    await pages.sac.switchToTab('Sapling Learning Student Assignment Container');
    await pages.sac.assertElementExists('Preview Check Answer Button');
});

When(/^I reset attempts from student "(.*)"$/, async function (userType) {
    await pages.sac.click('Course Link', 'Raptor Automation - Do Not Delete');
    await pages.sac.click('Instructor Assessment Link', 'All Mods');
    await pages.sac.assertElementExists('Activity Editor Tab', 'Responses');
    await pages.sac.click('Activity Editor Tab', 'Responses');
    await pages.sac.click('Edit Student Attempts Button');

    let user = this.users[userType];
    let name = user.firstName + " " + user.lastName;
    await pages.sac.click('Student Checkbox', name);

    await pages.sac.click('Reset Student Attempts Button');
    await pages.sac.click('Save Student Attempts Button');
});

When('I navigate to assessment', async function () {
    await pages.sac.click('Course Link', 'Raptor Automation - Do Not Delete');
    await pages.sac.click('Student Assessment Link');
});

When('I answer questions', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.sac.click('Question Button', datatable.hashes()[i].Question);
        switch (datatable.hashes()[i].Type) {
            case "MC":
                let correct = false;
                let option = 1;
                let score = 100;
                // In this loop I select and check every answer from the first one to the last one
                while (!correct) {
                    await pages.sac.click('Sample Assessment Question Radio Button', option);
                    await pages.sac.click('Check Answer Button');
                    let buttonText = await pages.sac.getText('Check Answer Button');
                    // This commented loop is to wait the button to be ready to click so I know if the answer was correct or incorrect
                    while (buttonText == "Please Wait") {
                        buttonText = await pages.sac.getText('Check Answer Button');
                    }
                    if (buttonText == 'Try Again') { //Wrong answer
                        score -= 5;
                        await pages.sac.click('Check Answer Button');
                    } else {
                        correct = true;
                    }
                    option++;
                }
                await pages.sac.click('View Solution Button');
                scores[i] = score + "/100";
                break;
            case "DD":
                await pages.sac.click('Check Answer Button');
                let buttonText = await pages.sac.getText('Check Answer Button');
                // This commented loop is to wait for the server response and then I can click the Give Up button
                while (buttonText == "Please Wait") {
                    buttonText = await pages.sac.getText('Check Answer Button');
                }
                await pages.sac.click('Give Up Button');
                await pages.sac.click('Confirm Give Up Button');
                scores[i] = "0/100";
                break;
        }
    }

});

Then('I verify grades for answers', async function () {
    for (let i = 0; i < scores.length; i++) {
        await pages.sac.assertText('Answer Score', i + 1, scores[i]);
    }
});

Then('The course landing page is loaded', async function () {
    await pages.sac.assertElementExists('Student Assessment Link');
});
