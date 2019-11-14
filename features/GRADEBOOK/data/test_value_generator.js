global.gradebook = global.gradebook || {};
global.gradebook.newCategoryName = null;
function getCategoryName () {
  if (global.gradebook.newCategoryName) {
    return global.gradebook.newCategoryName;
  }
  global.gradebook.newCategoryName = `New Smoke Category ${Math.random()}`;
  return global.gradebook.newCategoryName;
}
module.exports = {
  getCategoryName
};
