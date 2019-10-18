const raptorlib = require(`${process.cwd()}/features/ASSESSMENT/lib/raptor.js`);
const amslib = require(`${process.cwd()}/features/ASSESSMENT/lib/ams.js`);
const updatelib = require(`${process.cwd()}/features/ASSESSMENT/lib/update.js`);
const froalalib = require(`${process.cwd()}/features/ASSESSMENT/lib/froala.js`);
const hatchlinglib = require(`${process.cwd()}/features/ASSESSMENT/lib/hatchling.js`);
const userlib = require(`${process.cwd()}/features/ASSESSMENT/lib/user.js`);

module.exports = {
    raptorlib,
    amslib,
    updatelib,
    froalalib,
    hatchlinglib,
    userlib
};