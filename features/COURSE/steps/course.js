const { When, Then } = require('cucumber');
const pages = require('../pages/.page').pages;
const expect = require('chai').expect;

When('I generate and export course report', async function () {
  await pages.home.click('toggler_menu');
  await pages.user.click('admin');
  await pages.admin_menu.click('course_report')
  await pages.admin_menu.click('generate_report');
  await pages.admin_menu.click('export_report');
});

Then('I verify the report has the following columns', async function (data_table) {
  var today = new Date();
  var year = today.getFullYear()
  var date = ('0' + today.getDate());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = monthNames[today.getMonth()];

  let CSVFile = this.downloadLocation + `/features/reports/download/course_report_${month}-${date}-${year}.csv`;
  const csv = require('csvtojson')
  csv()
    .fromFile(CSVFile)
    .then((jsonObj) => {
      for (let e = 0; e < jsonObj.length; e++) {
        let row = jsonObj[e];
        for (let i = 0; i < data_table.rows().length; i++) {
          let columnName = row.hasOwnProperty(data_table.hashes()[i].ColumnNames);
          expect(columnName).to.be.oneOf(columnName);
        }
      }
    });
});
