const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

const selectSAVIModule = async function(dropdownOption, position) {
  position = position || 1;
  await pages.canvasSAVI.click('Module SAVI Edit', position);
  await pages.canvasSAVI.waitForElementVisibility('SAVI Edit Panel Dropdown');
  await pages.canvasSAVI.populate('SAVI Edit Panel Dropdown', dropdownOption);
  await pages.canvasSAVI.click('SAVI Edit Panel Done button');  
}

const moduleIsRendered = async function (saviModule) {
  switch (saviModule) {
    case 'Astronomy: Phases of the Moon':
      const containerIsDisplayed = pages.canvasSAVI.checkElementExists('SAVI Module Container');
      const playButtonIsDisplayed = pages.canvasSAVI.checkElementExists('SAVI Module Play Simulation Button');
      return containerIsDisplayed && playButtonIsDisplayed
      break;
  default:
    throw new Error(`Module ${saviModule} not yet implemented`)
  }
};

module.exports = {
  moduleIsRendered,
  selectSAVIModule
};