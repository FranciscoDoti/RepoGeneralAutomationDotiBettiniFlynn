let csvtojson = function (callback) {
  var today = new Date();
  var year = today.getFullYear()
  var date = (today.getDate());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'Jul', 'August', 'September', 'October', 'November', 'December'];
  var month = monthNames[today.getMonth()];

  let csvfile = require(`${process.cwd()}/reports/downloads/course_report_${month}-${date}-${year}.csv`)
  let csv = require('csvtojson')
  csv()
    .fromFile(csvfile)
    .then((jsonObj) => {
      callback(jsonObj)
      console.log(jsonObj);

    });
};

module.exports =
  csvtojson;