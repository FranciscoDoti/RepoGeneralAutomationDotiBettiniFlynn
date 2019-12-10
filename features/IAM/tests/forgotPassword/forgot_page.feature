@IAM
Feature: Forgot link is redirected to forgot page

    Scenario: Verify Forgot? Link is redirecting to forgot password page 
        Given I have opened "Achieve-CW"
        When I click on Forgot link
        Then I verify that I am redirected to forgot page