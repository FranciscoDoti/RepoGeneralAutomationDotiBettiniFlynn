# features/simple_math.feature
Feature: Test on MacMillan.com
  In order to automate tests as a developer
  I want to build a full feature pageObject

  Scenario:  macmillanLearning.com and attempt to login with a bad username and password
    Given That I have opened the Achieve "loginURL"
    When I enter "testUsername" and "testPassword"
    When I click by id "btn_signin" button
    Then I should get a message that says "Invalid username or password"

 # Scenario:  macmillanLearning.com
 #   Given I am on MacMillanLearning.com
 #   When I click the login button
    
