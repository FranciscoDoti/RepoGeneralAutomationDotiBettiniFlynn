const { When } = require('cucumber');
const { expect } = require('chai');
const { RestObject } = require(`${process.cwd()}/app/rest`);
const specPath = `${process.cwd()}/features/ASSESSMENT/apispecs`;

When('API _ I create a new Raptor item', async function () {
    let spec = `${specPath}/createRaptorItem.json`;
    let rest = new RestObject(spec);
    let requestHeaders = { "falconauth": "its-k58km4ih7qm5qelm35df6o2pqe"};
    expect(await rest.POST('AMS',requestHeaders)).to.equal(200);
    console.log(await rest.response);

});