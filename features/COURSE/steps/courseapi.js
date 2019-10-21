const { Given, When, Then } = require('cucumber');
const { restObject } = require(`${process.cwd()}/app/rest`);
const { expect } = require('chai');


Given('I create a course template using the API test-sm-api with the following details', async function (datatable) {
    let spec = `${process.cwd()}/features/COURSE/apispecs/lms/course/test-sm-api.json`;
    let rest = new restObject(spec);
    
    for(let i = 0; i < datatable.rows().length; i++){
        let courseData = datatable.hashes()[i];
        expect(await rest.POST(courseData)).to.equal(200);
    };
});