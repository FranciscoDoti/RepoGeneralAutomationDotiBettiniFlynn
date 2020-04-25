const { When } = require('cucumber');
const { expect } = require('chai');
const { RestObject } = require('test-automation-pack/rest');
const specPath = `${process.cwd()}/features/COURSE/apispecs`;

When('I create a course as {string} with the following data', async function (userType, datatable) {
  let spec = `${specPath}/createcourse.json`;
  let jwt = this.users[userType].jwt_payload;
  let api = new RestObject(spec);

  for (let data of datatable.hashes()) {
    let randomNumber = Math.floor(Math.random() * 10000000000000)
    data.isbn = '"' + randomNumber + '"'
    data.owner_id = jwt.user_id;
    const response = await api.post(this.apiserver, jwt, data);
    expect((response.statusCode || response.status)).to.equal(200);
    this.data.set(data.name, {
      courseName: data.name,
      short_name: data.short_name,
      isbn: data.isbn,
      id: response.id,
    });
  }
});

When('I copy course from {string} as {string} with the following data', async function (courseName, userType, datatable) {
  let courseId = this.data.get(courseName).id;
  let spec = `${specPath}/copycourse.json`;
  let jwt = this.users[userType].jwt_payload;
  let api = new RestObject(spec);
  
  for (let data of datatable.hashes()) {
    const current = new Date();
    let format  = current. toISOString().slice(0,10)
    next_date = new Date(current.setMonth(current.getMonth() + 3));
    format_Next =  next_date.toISOString().slice(0,10)
    data.enrollment_start_date = format;
    data.course_end_date = format_Next;
    
    await api.setResource((await api.getResource()).replace('ReplaceID',courseId));
    const response = await api.put(this.apiserver, jwt, data);
    console.log(response);

    this.data.set(data.name, {
      courseName: data.name,
      short_name: data.short_name,
      isbn: data.isbn,
      id: response.id,
    });
  }
});

When('I assign instructor to {string} as a {string}', async function(courseName, userName, datatable) {
  let courseId = this.data.get(courseName).id;
  let spec = `${specPath}/enrollInstructor.json`;
  let jwt = this.users[userName].jwt_payload;
  let api = new RestObject(spec);

  for (let data of datatable.hashes()) {
    data.enrollments = this.users[data.enrollments].jwt_payload;
    data.id = courseId;

    await api.setResource((await api.getResource()).replace('ReplaceID',courseId));
    const response = await api.put(this.apiserver, jwt, data);
    console.log(response);
  }
});

When('I activate {string} as {string} with following data', async function (courseName, userType, datatable) {
  let courseId = this.data.get(courseName).id;
  let spec = `${specPath}/activate.json`;
  let jwt = this.users[userType].jwt_payload.instructors;
  let api = new RestObject(spec);
  
  const date = new Date();
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth()+3);
  const DateJson = date.toJSON()
  const futureJson = futureDate.toJSON();
  for (let data of datatable.hashes()) {
    let user = this.users[userType].jwt_payload
    data.id = courseId
    data.owner_id = user.user_id
    data.enrollment_start_date = DateJson;
    data.course_end_date = futureJson;
    data.enrollments = user;

    await api.setResource((await api.getResource()).replace('ReplaceID',courseId));
    const response = await api.put(this.apiserver, jwt, data);
    console.log(response);
  }
});

When('I add activities to the content library of {string} template', async function (courseName, datatable) {
    let courseId = this.data.get(courseName, 'id');
    let spec = `${specPath}/addingActivities.json`;
    let jwt = this.users['admin_1'].jwt_payload;
    let api = new RestObject(spec);

    let data = {}
    let items = []
    for (let row of datatable.hashes()) {
      let item = await activitySearch(row.name, jwt, this)
      await items.push(item)
    }
    
    data.items = items;
    await api.setResource((await api.getResource()).replace('ReplaceID',courseId));
    const response = await api.put(this.apiserver, jwt, data);
    console.log(response);
    expect((response.statusCode || response.status)).to.equal(200)
    
})

async function activitySearch(activityName, jwt, context){
  let spec = `${specPath}/searchActivity.json`;
  let api = new RestObject(spec);

  let data = {}
  data.searchTerm = activityName;
  const response = await api.put(context.apiserver, jwt, data);
  console.log(response);

  let item = {}
  item.name = await response.hits[0].name
  item.objectId = await response.hits[0].objectID
  item.tool = await response.hits[0].type
  item.activity_id = await response.hits[0].activity_id
  item.isInContentLibrary = false
  item.isDisabled = false
  item.actionText = "Show in Content Library"
  item.folder_id = null
  return item
}

