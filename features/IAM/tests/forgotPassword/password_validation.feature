@IAM @failing
Feature: Password validation

    Scenario: Verify that password field validations are working as expected
        Given I have opened "Achieve-CW"
        When I click on Forgot link
        And I am redirected to Password Reset page and enter "student_3" username and click Reset Password
        Then I enter the correct security answer "test" and I verify the following title "We’re trying to locate your account"