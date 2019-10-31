const { Given, When, Then } = require('cucumber');
const { RestObject } = require(`${process.cwd()}/app/rest`);
const { expect } = require('chai');
const specPath = `${process.cwd()}/features/COURSE/apispecs/lms/course`;


Given('I create a course template with as {string} with the following data', async function (user, datatable) {
    let spec = `${specPath}/createcourse.json`;
    let rest = new RestObject(spec);
    
    for(let i = 0; i < datatable.rows().length; i++){
        let courseData = datatable.hashes()[i];
        expect(await rest.POST(courseData)).to.equal(200);
        console.log(await rest.response());
    };
});