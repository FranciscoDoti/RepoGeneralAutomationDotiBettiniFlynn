let csvtojson = function (callback) {
  var today = new Date();
  var year = today.getFullYear()
  var date = ('0' + today.getDate());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = monthNames[today.getMonth()];

  let csvfile = require(`${process.cwd()}/reports/downloads/course_report_${month}-${date}-${year}.csv`
  const csv = require('csvtojson')
  csv()
    .fromFile(csvfile)
    .then((jsonObj) => {
      callback(jsonObj)

    });
};

module.exports =
  csvtojson;