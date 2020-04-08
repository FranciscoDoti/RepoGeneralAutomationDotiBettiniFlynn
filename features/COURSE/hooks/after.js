// var { After, AfterAll } = require('cucumber');
// const specPath = `${process.cwd()}/features/COURSE/apispecs`;
// const { RestObject } = require(`${process.cwd()}/app/rest`);


// After('@delete-Courses', async function () {
//     let spec = `${specPath}/deletecourse.json`;
//     let jwt_payload = this.users['admin_1'].jwt_payload;

//     this.data.data.keys().forEach(courseName => {
//         let api = new RestObject(spec);
//         api.setCookie(jwt_payload);
//         api.spec.endpoint = api.spec.endpoint.replace('{id}', this.data.get(courseName, 'id'));
//         api.DELETE('Achieve-CW');
//     });
// });