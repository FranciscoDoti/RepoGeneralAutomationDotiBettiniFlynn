const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { rankinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I edit the Ranking', async function (datatable) {
    await pages.ranking.click('Ranking Panel');
    await pages.ranking.click('Ranking Action Edit Button', 'Edit');
    let rankingIndex = 1;
    await pages.ranking.waitForElementVisibility('Ranking Bin Headers Input', '1');
    for (let i = 0; i < datatable.rows().length; i++) {
        let field = datatable.hashes()[i];
        if (field['Type'] === 'Token') {
            await rankinglib.configureRanking(field, rankingIndex);
            rankingIndex++;
        } else {
            await rankinglib.configureLabels(field);
        }
    }
    await pages.ranking.click('Ranking Edit Done Button');
});

When('I configure the Correct Context for Ranking', async function (datatable) {
    await pages.raptor.click('Tab', 'correct');
    await pages.ranking.waitForElementVisibility('Ranking Context Drop Item');
    for (let i = 0; i < datatable.rows().length; i++) {
        let field = datatable.hashes()[i];
        await pages.ranking.dragAndDrop('Ranking Context Drag Item', 'Ranking Context Drop Item', field['Value']);
    }
}); 