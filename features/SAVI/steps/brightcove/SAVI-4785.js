const { Given, When, Then } = require('cucumber');
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep, } = require(`${process.cwd()}/app/driver.js`);
const urls = require(`${process.cwd()}/config/urls.json`);
const { PageObject } = require(`${process.cwd()}/app/PageObject`);


Given('I have opened Google', async function (data_table) {
    let url = await _.get(urls, ['Google', this.stack]);
        await visitURL(url);  
        await pages.videolist.assertElementExists('fakebox-input')  
        await pages.videolist.click('fakebox-input');
/*    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.videolist.populate('link', data_table.hashes()[i].link);
    } */
}); 