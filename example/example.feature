Feature: Testing

  Scenario: Test DateProcessing code
    Then I visually confirm that date @date(3 weeks from now) will be 3 weeks in the future
    Then I visually confirm that date @date(1 day 12 hours 30 minutes ago) will be 36.5 hours in the past
    Then I visually confirm that date @date(18 months from now) will be 1.5 years in the future
    Then I visually confirm that date @date(1.5 years from now) will be 18 months in the future
    Then I visually confirm that date @date(3 weeks) will fail with an understandable error

  Scenario: Test StringProcessing code
    When I want to test @faker.user and @randomInt
    When I want to test @faker.user and @rnd(100)
    When I want to test @faker.email and @rnd(50,100)
    When I want to test @faker.lorem.word and @rnd
    When I want to test @faker.lorem.paragraph and @rnd
    # @data(fileName, fieldName) - fileName must be under config/${environment}/data
    When I want to load @data(example,test) from json
    When I want to load @data(example,timeout) from json
    When I want to load @data(example,someDataField) from json
    When I want to load @data(example,someDataField) from json

  Scenario: Test Assertion works
    Given I am on MacMillanLearning.com
    Then I want assert "btn_login" matches "SIGN IN"

  Scenario: Test Login data retreival code
    Then I visually confirm that login data @login(admin,username) is the username stored
    Then I visually confirm it failed that login data is bad @login(badFilename,username) has error because of bad filename
    Then I visually confirm it failed that login data is bad @login(admin,badUsername) has error because of variable name
    Then I visually confirm it failed that login data is bad @login(admin) has error because of only 1 parameter

  Scenario: Test generating a datatable.
    Then I generate a dataTabe for this page Object
    
