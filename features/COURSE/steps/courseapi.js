/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const { When } = require('cucumber');
const { expect } = require('chai');
const { RestObject } = require('test-automation-pack/rest');

const specPath = `${process.cwd()}/features/COURSE/apispecs`;
async function activitySearch(activityName, jwt, context) {
  const spec = `${specPath}/searchActivity.json`;
  const api = new RestObject(spec);

  const data = {};
  data.searchTerm = activityName;
  const response = await api.put(context.apiserver, jwt, data);
  console.log(response);

  const item = {};
  item.name = await response.hits[0].name;
  item.objectId = await response.hits[0].objectID;
  item.tool = await response.hits[0].type;
  item.activity_id = await response.hits[0].activity_id;
  item.isInContentLibrary = false;
  item.isDisabled = false;
  item.actionText = 'Show in Content Library';
  item.folder_id = null;
  return item;
}


When('I create a course as {string} with the following data', async function (userType, datatable) {
  const spec = `${specPath}/createcourse.json`;
  const jwt = this.users[userType].jwt_payload;
  const api = new RestObject(spec);

  // eslint-disable-next-line no-restricted-syntax
  for (const data of datatable.hashes()) {
    const randomNumber = Math.floor(Math.random() * 10000000000000);
    data.isbn = `"${randomNumber}"`;
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

// eslint-disable-next-line max-len
When('I copy course from {string} as {string} with the following data', async function (courseName, userType, datatable) {
  const courseId = this.data.get(courseName).id;
  const spec = `${specPath}/copycourse.json`;
  const jwt = this.users[userType].jwt_payload;
  const api = new RestObject(spec);

  // eslint-disable-next-line no-restricted-syntax
  for (const data of datatable.hashes()) {
    const current = new Date();
    const format = current.toISOString().slice(0, 10);
    // eslint-disable-next-line camelcase
    next_date = new Date(current.setMonth(current.getMonth() + 3));
    format_Next = next_date.toISOString().slice(0, 10);
    data.enrollment_start_date = format;
    data.course_end_date = format_Next;

    await api.setResource((await api.getResource()).replace('ReplaceID', courseId));
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

When('I assign instructor to {string} as a {string}', async function (courseName, userName, datatable) {
  const courseId = this.data.get(courseName).id;
  const spec = `${specPath}/enrollInstructor.json`;
  const jwt = this.users[userName].jwt_payload;
  const api = new RestObject(spec);

  // eslint-disable-next-line no-restricted-syntax
  for (const data of datatable.hashes()) {
    data.enrollments = this.users[data.enrollments].jwt_payload;
    data.id = courseId;

    await api.setResource((await api.getResource()).replace('ReplaceID', courseId));
    const response = await api.put(this.apiserver, jwt, data);
    console.log(response);
  }
});

When('I activate {string} as {string} with following data', async function (courseName, userType, datatable) {
  const courseId = this.data.get(courseName).id;
  const spec = `${specPath}/activate.json`;
  const jwt = this.users[userType].jwt_payload.instructors;
  const api = new RestObject(spec);

  const date = new Date();
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 3);
  const DateJson = date.toJSON();
  const futureJson = futureDate.toJSON();
  // eslint-disable-next-line no-restricted-syntax
  for (const data of datatable.hashes()) {
    const user = this.users[userType].jwt_payload;
    data.id = courseId;
    data.owner_id = user.user_id;
    data.enrollment_start_date = DateJson;
    data.course_end_date = futureJson;
    data.enrollments = user;

    await api.setResource((await api.getResource()).replace('ReplaceID', courseId));
    const response = await api.put(this.apiserver, jwt, data);
    console.log(response);
  }
});

When('I add activities to the content library of {string} template', async function (courseName, datatable) {
  const courseId = this.data.get(courseName, 'id');
  const spec = `${specPath}/addingActivities.json`;
  const jwt = this.users.admin_1.jwt_payload;
  const api = new RestObject(spec);

  const data = {};
  const items = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const row of datatable.hashes()) {
    const item = await activitySearch(row.name, jwt, this);
    await items.push(item);
  }

  data.items = items;
  await api.setResource((await api.getResource()).replace('ReplaceID', courseId));
  const response = await api.put(this.apiserver, jwt, data);
  console.log(response);
  expect((response.statusCode || response.status)).to.equal(200);
});
