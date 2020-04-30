const { Given, When } = require('cucumber');
const { visitURL } = require('test-automation-pack/driver');
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/Instagram/pages/.page.js`).pages;
const { instagramLib } = require(`${process.cwd()}/features/Instagram/lib/index.js`);

When (/^Empiezo a seguir "(.*)" personas$/ , async function (cantPersonas){
    await instagramLib.seguirAPersonas(cantPersonas);
});