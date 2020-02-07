@IAM @failing
Feature: Forgot password functionality

    Scenario: Verify that forgot password functionality working fine 

        Given I have opened "Achieve-CW"
        
        When I click on Forgot link
        Then I verify that I am redirected to forgot page

        And I am redirected to Password Reset page and enter "student_3" username and click Reset Password
        Then I enter the correct security answer "test" and I verify the following title "We’re trying to locate your account"

        When I go to my email account "test.macmillan@yahoo.com"
        And I check my email I click on the link to reset my password
        And I am redirected to Password Reset page and enter "student_3" username and click Reset Password