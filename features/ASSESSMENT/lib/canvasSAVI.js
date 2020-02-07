const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;


const moduleAstronomyPhasesOfTheMoonIsDisplayed = function () {
  const containerIsDisplayed = pages.canvasSAVI.checkElementExists('SAVI Module Container');
  const playButtonIsDisplayed = pages.canvasSAVI.checkElementExists('SAVI Module Play Simulation Button');
  return containerIsDisplayed && playButtonIsDisplayed
}

const moduleIsRendered = async function (saviModule) {
  switch (saviModule) {
    case 'Astronomy: Phases of the Moon':
      return moduleAstronomyPhasesOfTheMoonIsDisplayed()
      break;
  default:
    throw new Error(`Module ${saviModule} not yet implemented`)
  }
};

module.exports = {
  moduleIsRendered
};