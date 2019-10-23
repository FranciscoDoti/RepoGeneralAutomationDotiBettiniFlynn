const { Given, When, Then } = require('cucumber');
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep, } = require(`${process.cwd()}/app/driver.js`);
const urls = require(`${process.cwd()}/config/urls.json`);
const { PageObject } = require(`${process.cwd()}/app/PageObject`);


Given('I have opened videoplayer', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++)    {
        await visitURL(data_table.hashes()[i].video);
    } 
}); 

Given('I have opened audioplayer', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++)    {
        await visitURL(data_table.hashes()[i].audio);
    } 
});