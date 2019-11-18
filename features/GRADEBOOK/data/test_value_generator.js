global.gradebook = global.gradebook || {};
global.gradebook.newCategoryName = null;
function getCategoryName () {
  if (global.gradebook.newCategoryName) {
    return global.gradebook.newCategoryName;
  }
  global.gradebook.newCategoryName = `${Math.random()}`.substr(0, 5);
  return global.gradebook.newCategoryName;
}

module.exports = {
  getCategoryName
};
