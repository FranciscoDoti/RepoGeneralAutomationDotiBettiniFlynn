const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const configureRanking = async function (field, rankingIndex) {
    if (rankingIndex > 4) {
        await pages.ranking.click('Ranking Edit Token Button', 'Add a Token');
    }
    await pages.ranking.waitForElementVisibility('Ranking Token Labels Input', rankingIndex);
    await pages.ranking.populate('Ranking Token Labels Input', rankingIndex, field['Value']);
};

const configureLabels = async function (field) {
    await pages.ranking.populate('Ranking Bin Headers Input', field['Type'] == 'Top' ? 1 : 2, field['Value']);
};

module.exports = {
    configureLabels,
    configureRanking
};