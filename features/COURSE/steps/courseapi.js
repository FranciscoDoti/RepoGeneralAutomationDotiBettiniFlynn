const { When } = require('cucumber');
const { RestObject } = require(`${process.cwd()}/app/rest`);
const { expect } = require('chai');
const specPath = `${process.cwd()}/features/COURSE/apispecs/lms/course`;

When('I create a course template with as {string} with the following data', async function (userType, datatable) {
    let spec = `${specPath}/createcourse.json`;
    let jwt_payload = this.users[userType].jwt_payload;
    let rest = new RestObject(spec);
    rest.setCookie(jwt_payload);
    
    for(let i = 0; i < datatable.rows().length; i++){
        let courseData = datatable.hashes()[i];
        expect(await rest.POST(courseData)).to.equal(200);
        console.log(await rest.response());
    };
});