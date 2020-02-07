@IAM @incompleteTest
Feature: Verify that Security questions are working appropriately

    Scenario: Verify that Security Question & Answer validations are working as expected

        Given I have opened "Achieve-CW"
        When I click on Forgot link
        And I am redirected to Password Reset page and enter "student_1" username and click Reset Password

        And I enter the incorrect security answer "abc" "one" time and I verify the following message "Your answer was not correct. You have 2 attempts left before your user account is temporarily locked."
        And I enter the incorrect security answer "abc" "two" time and I verify the following message "Your answer was not correct. You have 1 attempt left before your user account is temporarily locked."
        And on the third time I enter the incorrect security answer "abc" I verify the following message "Your Macmillan Learning account has been temporarily locked because an attempt was made to log in without the correct authentication. Please try again in 15 minutes."

        And I am redirected to Password Reset page and enter "student_3" username and click Reset Password
        And I enter the incorrect security answer "abc" "one" time and I verify the following message "Your answer was not correct. You have 2 attempts left before your user account is temporarily locked."
        And I enter the incorrect security answer "abc" "two" time and I verify the following message "Your answer was not correct. You have 1 attempt left before your user account is temporarily locked."
        And I enter the correct security answer "test" and I verify the following message "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."

        And I am redirected to Password Reset page and enter "student_3" username and click Reset Password
        And I enter the incorrect security answer "abc" "one" time and I verify the following message "Your answer was not correct. You have 2 attempts left before your user account is temporarily locked."
        And I enter the correct security answer "test" and I verify the following message "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."

        And I am redirected to Password Reset page and enter "student_3" username and click Reset Password
        And I enter the correct security answer "test" and I verify the following message "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."