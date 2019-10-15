const raptorlib = require(`${process.cwd()}/features/ASSESSMENT/lib/raptor.js`);
const hatchlinglib = require(`${process.cwd()}/features/ASSESSMENT/lib/hatchling.js`);
const amslib = require(`${process.cwd()}/features/ASSESSMENT/lib/ams.js`);
const updatelib = require(`${process.cwd()}/features/ASSESSMENT/lib/update.js`);
const filterslib = require(`${process.cwd()}/features/ASSESSMENT/lib/filters.js`);
module.exports = {
    raptorlib,
    hatchlinglib,
    amslib,
    updatelib,
    filterslib
};