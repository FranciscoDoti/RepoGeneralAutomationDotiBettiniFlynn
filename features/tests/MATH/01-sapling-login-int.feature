Feature: Aithentication for sapling login

Scenario: Verify user logs into Sapling successfully

Given the sapling-AMS "Math-saplUrl" page is loaded
When the login and password fields are displayed
Then user inputs login info with "raptor"  
And user is successfully logged into AMS "Math-AMSUrl" 