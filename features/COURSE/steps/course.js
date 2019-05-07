const { When, Then } = require('cucumber');
const pages = require('../pages/.page').pages;

When('I generate and export course report', async function () {
    await pages.home.click('toggler_menu');
    await pages.user.click('admin');
    await pages.admin_menu.click('generate_course_report')
    await pages.admin_menu.click('generate_report');
    await pages.admin_menu.click('export_report');
});

Then('I verify the report has the following columns', async function (data_table) {
    let CSVFile = this.downloadLocation+'/features/reports/course_report_May-06-2019.csv';
    let JSONData = JSON.parse(CSVFile);
    let columnNames;
    
    for (var key in JSONData) {
        columnNames.push(key);
    }
    
    for (let i = 0; i < data_table.rows().length; i++) {
        let columnName = row.hasOwnProperty(data_table.hashes()[i].ColumnNames);
        expect(columnName).to.be.oneOf(columnNames);
    }
});