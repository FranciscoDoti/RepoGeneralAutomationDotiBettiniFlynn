# Naming Conventions
1. Files: kebab-case-files
2. Function: camelCaseFunctions
3. Data: snake_case_data

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

# Scenario Files
Scenario files are a single source of truth for what is being tested and serves as a test plan for the product or system under test (SUT).  System scenarios should include all tests for a given system in a single file, whereas a Happy path scenario should encompass a user flow through a given feature and include no other test scenario in the file.

Scenario files are located in a projects test folder and end in .feature

# Step Functions
Step functions are repeated patterns of user behavior that are called in scenario files.  Take the following example
1. Click the login button
2. Input the user's email address
3. Input the user's password
4. Click the sign in button

An alternative to this repeated pattern is to create a login function in a step file.  The following example takes a dynamic object from the scenario file denoted by the "(.*)" and passes the value into the function as user_object.  The scenario can now call the function 'I have logged in as "user"' as opposed to writing 4 separate lines of code, increasing the readabiilty of the scenario file.  Please note that when passing in a dynamic object/variable in a file the function starts and ends with /^ $/ as opposed to the typical ""

```javascript
  When(/^I have logged in as "(.*)"$/, async function(user_object) {
    let qa = new selenium(driver);
    let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

    await qa.input(page.iam.login.username, payload.username, true);
    await qa.input(page.iam.login.password, payload.password, true);
    await qa.click(page.iam.login.sign_in);
  })
```
An additional note about dynamic functions is that only user objects are stored in the data directory as an email/password combination.  All other data should use the data table functionality provided by Cucumber.

# Data Tables
Data tables are used to pass multiple variables into a function, and are passed as an array that can be looped through.  This pattern is the accepted Cucumber format and is used for readabiilty of established test cases.
[Data Tables](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/data_table_interface.md)

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

# Screenshots
Screenshots are taken on test failure, and show the state of the UI when the test failed.  They are stored in the screenshot directory, and are not pushed up to the repo.  In a CI environment they will be stored as artifacts of the build.

# Support Files

## World
The world.js file builds a custom world file that builds the Selenium driver and attaches it to the world object.  Additional CI logic is scripted into this file that allows the driver to communicate with a dockerized Selenium serever, or with the browserstack service.

## Support
The support file consists of functionality that is needed by all projects to properly interact with the system.  The functionality in this file can be used to create a test scenario to ensure that the test works as expected.  After creation of a test it is best to refactor repeated logic into a proper step function for reusability.

## URL
The url file dynamically builds a url for any environment based off of the config value.  If you need to add a new URL path to the file please follow the if/else logic pattern already established in the file.

## After
The after.js file stores global after functionality that is applied to all running tests.  If you need a localized after command for a specific project is should be created in the project specific after file.  Currenlty the file only utilizes the global close browser and take screenshot functionality.

# Shared Framework
Shared framework files are stored in the App folder and encompasses various functionality listed here

## Selenium
The Selenium file gives access to various Selenium [JavaScript](https://seleniumhq.github.io/selenium/docs/api/javascript/) bindings.  Each command is wrapped in a dynamic locating function that is controlled by the config timeout value.  The file can easily be extended with new functionality, just be mindful to call the _locator and _exists function.

## REST
The REST function is a simple interface to the request-promise package.  The functionality is still a work in progress, and webservices still need to be created

## Email
Email functionality is encompassed in the imap.js file and allows the application to get the information from an email service.  The file uses the npm package node-imap which uses callbacks as there is not a npm package that uses a promise manager.  Be careful to note that parsing of an email may complete after the function returns it's promise.  This can be resolved by using a while loop.
