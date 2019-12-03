const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const draw = async function (drawing) {
    await pages.moldraw.click(drawing + ' Button');
    await pages.moldraw.click('Drawing Area');
};

module.exports = {
    draw
};