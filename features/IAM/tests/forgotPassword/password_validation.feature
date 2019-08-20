Feature: Password validation

    Scenario: Verify that password field validations are working as expected

        Given I have opened Achieve "Achieve-CW"
        When I click on Forgot link
        And I am redirected to Password Reset page and enter "student_3" username and click Reset Password

        Then I enter the correct security answer "test" and I verify the following message "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."
            


