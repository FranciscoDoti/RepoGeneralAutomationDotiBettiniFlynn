const raptorlib = require(`${process.cwd()}/features/ASSESSMENT/lib/raptor.js`);
const amslib = require(`${process.cwd()}/features/ASSESSMENT/lib/ams.js`);
const updatelib = require(`${process.cwd()}/features/ASSESSMENT/lib/update.js`);
const froalalib = require(`${process.cwd()}/features/ASSESSMENT/lib/froala.js`);
const hatchlinglib = require(`${process.cwd()}/features/ASSESSMENT/lib/hatchling.js`);
const userlib = require(`${process.cwd()}/features/ASSESSMENT/lib/user.js`);
const filterslib = require(`${process.cwd()}/features/ASSESSMENT/lib/filters.js`);
const moldrawlib = require(`${process.cwd()}/features/ASSESSMENT/lib/moldraw.js`);
const relatedsetlib = require(`${process.cwd()}/features/ASSESSMENT/lib/relatedset.js`);
const canvasSAVIlib = require(`${process.cwd()}/features/ASSESSMENT/lib/canvasSAVI.js`);

module.exports = {
    raptorlib,
    amslib,
    updatelib,
    froalalib,
    hatchlinglib,
    userlib,
    filterslib,
    moldrawlib,
    relatedsetlib,
    canvasSAVIlib
};