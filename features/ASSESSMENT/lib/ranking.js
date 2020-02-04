const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const configureRanking = async function (field, rankingIndex) {
    console.log('rankingIndex: ' + rankingIndex);
    if (rankingIndex > 4) {
        await pages.ranking.click('Ranking Edit Token Button', 'Add a Token');
        await pages.ranking.waitForElementVisibility('Ranking Token Labels Input', rankingIndex);
    }
    console.log('add ranking');
    await pages.ranking.waitForElementVisibility('Ranking Token Labels Input', rankingIndex);
    await pages.ranking.populate('Ranking Token Labels Input', rankingIndex, field['Value']);
    console.log('salgo');
};

const configureLabels = async function (field) {
    switch (field['Type']) {
        case 'Top':
            await pages.ranking.populate('Ranking Bin Headers Input', 1, field['Value']);
            break;
        case 'Bottom':
            await pages.ranking.populate('Ranking Bin Headers Input', 2, field['Value']);
            break;
    }
};

module.exports = {
    configureLabels,
    configureRanking
};