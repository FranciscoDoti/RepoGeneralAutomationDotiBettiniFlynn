# Naming Conventions
Files: kebab-case-files
Function: camelCaseFunctions
Data: snake_case_data

# Run a specific feature file
```
node_modules/cucumber/bin/cucumber-js features/PROJECT/test/file-name.feature
```

# Run a NPM named test suite
NPM run scripts can be created in the package.json file located in the root directory
```
npm run NAMED-SCRIPT
```

# Config Object
The config object stores environmental data used by the Cucumber suite, and is stored in the root directory.
1. mode: controls which Selenium server will be used.  Most users will want to have this set to 'local', CI will use 'browserstack'
2. environment: controls which which environment is used. ie: dev, int, etc.
3. timeout: controls the time that a test will timeout waiting for a Selenium action to take place before a test fails
4. sleep: controls the global sleep time that is used in some functionality.  Sleep should be used with extreme caution
5. headers: stores the base REST headers needed for most REST calls, and can be extended used lodash's merge functionality

# Cucumber Documentation
Cucumber has extensive documentation on their website, however we are using the JavaScript implementation that has slightly different use cases and reduced complexity when interacting with the world object.  It is better to review the GitHub code base to find the appropriate pattern for the language.  Advanced interactions with the API can be located in the 'docs' folder in the repo.
[Cucumber-JS](https://github.com/cucumber/cucumber-js)

# World Object
World is an isolated context for each scenario, and has access to the hooks and steps as the this object.   A new instance of the World object is created for each scenario to prevent state changes between each test case.

The Selenium driver is instantiated at the beginning of each scenario and is torn down after the scenario has completed.  Each scenario has access to all page objects, text asserts, and step functions.

It is important to know that the afterAll functionality does not have access to the World object, which will also mean that it does not have access to the Selenium driver object.

# Step Functions
Step functions are repeated patterns of user behavior that are called in scenario files.  Take the following example
1. Click the login button
2. Input the user's email address
3. Input the user's password
4. Click the sign in button

An alternative to this repeated pattern is to create a login function in a step file.  The following example takes a dynamic object from the scenario file denoted by the "(.*)" and passes the value into the function as user_object.

```javascript
  When(/^I have logged in as "(.*)"$/, async function(user_object) {
    let qa = new selenium(driver);
    let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

    await qa.input(page.iam.login.username, payload.username, true);
    await qa.input(page.iam.login.password, payload.password, true);
    await qa.click(page.iam.login.sign_in);
  })
```

# Page Objects
Page objects are stored per project team, and are a nested JSON object with a key value pair, and store the CSS or XPATH value for the locator.  They are organized by project teams and are nested based off of the page being used, or by a menu on a page.  Page objects are bulk loaded by the master-page.js file located in the features directory.

We use the NPM package page-format when we need a dynamic value by placing an object inside of single quote marks.  
```
  "object": "//*[text()='{}']"
```
And we call it similar to the following code snippet
```
  let page_format = format(page.PROJECT.feature.object, 'dynamic_test');
```
Usage of this pattern can be found in the COURSE page object and associated step functionality.

# Text Asserts
Text assertions are stored per project team, and are a nested JSON object that follows the associated project page object model.  Text strings can be made to be dynamic using the page-format module if necessary.  Text asserts are bulk loaded by the master-assert.js file located in the feature directory.
