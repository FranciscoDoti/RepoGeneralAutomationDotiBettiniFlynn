const stepsPath = process.cwd() + "/features/ffn/_page/";

let pages = {
main : new PageObject('main.json', stepsPath),
login : new PageObject('login.json', stepsPath),
footer : new PageObject('footer.json', stepsPath),
logos : new PageObject('logos.json', stepsPath),
create_account : new PageObject('create_account.json', stepsPath),
};

module.exports = pages;