const { Given, When } = require('cucumber');
const { visitURL } = require(`${process.cwd()}/app/driver`);
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/Instagram/pages/.page.js`).pages;
const { instagramLib } = require(`${process.cwd()}/features/Instagram/lib/index.js`);

Given ('Ir a la seccion sugerencias' , async function (){
    await pages.paginaInicio.click('See all');
});