const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const applyTimeLimit = async function (hours, minutes) {
    await pages.gradingSettings.click('Time Limit Checkbox');
    await pages.gradingSettings.populate('Time Limit - Hours', hours);
    await pages.gradingSettings.populate('Time Limit - Minutes', minutes);
};

module.exports = {
    applyTimeLimit
};
