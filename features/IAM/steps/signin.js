const { Given, When, Then } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;
const { visitURL, sleep } = require(`${process.cwd()}/app/driver.js`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const mathPages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const driver  = require(`${process.cwd()}/app/driver`);
const PageObject = require(`${process.cwd()}/app/PageObject.js`);
const checkEmail = require(`${process.cwd()}/features/COURSE/steps/checkEmail.js`);
//const HashTable = require(`${process.cwd()}/app/HashTable.js`)HashTable;
var window = window;

Given('I have opened Achieve "signURL"', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
    await visitURL(url);
    await pages.signIn.click('signinlink');
});

When('I login with invalid credentials and I verify the message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.signIn.populate('username', data_table.hashes()[i].Username);
    await pages.signIn.populate('password', data_table.hashes()[i].Password);
    await pages.signIn.click('signin');
    let test = await pages.signIn.getText('verify'); 
        if (test === data_table.hashes()[i].verify);
        console.log(test);
    }
}); 

/*Then('I verify following message is displayed after {int} failure login attempts', async function (int, data_table) {
    for (let i = 1; i < data_table.rows(1).length; i++) {
    await pages.signIn.assertTextIncludes('verify', data_table.hashes()[i].verify);
    }
});*/
  
Then(/^I verify that I am able to login with correct credentials as "(.*)"$/, async function (userType) {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
    let user = await _.get(users, [this.environment, userType]);
  
    await visitURL(url);
    await pages.signIn.click('signinlink');
    await pages.signIn.populate('username', user.username);
    await pages.signIn.populate('password', user.password);
    await pages.signIn.click('signin');
});

When('I sign out of Achieve', async function () {
    await pages.login.click('togglerMenu');
    await pages.login.click('signOut');
}); 

When('I have logged in as {string}', async function (userType) {
    let user = await _.get(users, [this.environment, userType]);
    await pages.signIn.populate('username', user.username);
    await pages.signIn.populate('password', user.password);
    await pages.signIn.click('signin');
});

Then('I <verify> that I am able to login in as existing user before deployement.', async function (data_table) {
    await pages.signIn.assertElementExists('username');
})
    
When('I click on footer links, I verify that each link is directed to correct page', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.signIn.assertElementExists('footerLinks', data_table.hashes()[i].Objects);    
    await pages.signIn.click('footerLinks', data_table.hashes()[i].Objects);
//    await sleep(2000);
    await pages.signIn.switchToTab('Privacy Notice');
//    await sleep(2000);
    let test = await pages.signIn.getText('privacy'); 
        if (test === data_table.hashes()[i].verify);
        console.log(test); 

    await pages.signIn.switchToTab('Login');
    await pages.signIn.assertElementExists('footerLinks', data_table.hashes()[i + 1].Objects);    
    await pages.signIn.click('footerLinks', data_table.hashes()[i + 1].Objects);
//    await sleep(2000);
    await pages.signIn.switchToTab('Terms of Purchase');
//    await sleep(2000);
    let test1 = await pages.signIn.getText('termsOfPurchase'); 
        if (test1 === data_table.hashes()[i + 1].verify);
        console.log(test1); 

    await pages.signIn.switchToTab('Login');
    await pages.signIn.assertElementExists('footerLinks', data_table.hashes()[i + 2].Objects);    
    await pages.signIn.click('footerLinks', data_table.hashes()[i + 2].Objects);
//    await sleep(2000);
    await pages.signIn.switchToTab('Anti-Piracy');
//    await sleep(2000);
   
    let test2 = await pages.signIn.getText('anti-Piracy'); 
        if (test2 === data_table.hashes()[i + 2].verify);
        console.log(test2);

    await pages.signIn.switchToTab('Login');
    await pages.signIn.assertElementExists('footerLinks', data_table.hashes()[i + 3].Objects);    
    await pages.signIn.click('footerLinks', data_table.hashes()[i + 3].Objects);
    await sleep(2000);
    await pages.signIn.switchToTab('Home');
//    await sleep(2000);
    let test3 = await pages.signIn.getText('home'); 
        if (test3 === data_table.hashes()[i + 3].verify);
        console.log(test3);

    await pages.signIn.switchToTab('Login');
    await pages.signIn.assertElementExists('footerLinks', data_table.hashes()[i + 4].Objects);    
    await pages.signIn.click('footerLinks', data_table.hashes()[i + 4].Objects);
//    await sleep(2000);
    await pages.signIn.switchToTab('Instructor Store');
//    await sleep(2000);
    let test4 = await pages.signIn.getText('instructorStore'); 
        if (test4 === data_table.hashes()[i + 4].verify);
        console.log(test4); 
    break   
    }
}); 

When(/^I hover on "(.*)" icon$/, async function (document) { 
    await pages.signIn.assertElementExists('frameRegistration');
/*    var svgParent = document.getElementById('frameRegistration');
    var svgElement = document.getElementById("tooltip");
    await pages.signIn.assertElementExists('tooltip');
    svgParent.className.baseVal = ''; //remove class "invisible"
    svgElement.className.baseVal = ''; //remove class "invisible" */

    function checkValues()
{
   var isFormValid, form_fname;

   isFormValid = true;
   form_fname = document.getElementById('fname');
   if (form_fname.value === '')
   {
       isFormValid = false;
   }
   isFormValid || alert('I am indicating that there is something wrong with your input.')

   return isFormValid;
    
    };

Then('I {string} the help as following information', async function (string) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.singIn.click('registration');
        let test = await pages.signIn.getText('registration'); 
            if (test === data_table.hashes()[i].verify);
            console.log(test);
    }
});

});
