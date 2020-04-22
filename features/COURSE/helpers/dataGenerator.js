const faker = require('faker');
const randomNumber = faker.random.number(10000000000, 99999999999);
const randomURL = `https://www.google.com/search?q=${randomNumber}`
const randomURLDisplayName = `${randomNumber} - Google Search`

module.exports = {
randomNumber,
randomURL,
randomURLDisplayName
  };