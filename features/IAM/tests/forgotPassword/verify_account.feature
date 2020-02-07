@IAM
Feature: Message displayed for not registered user

    Scenario: Verify that forgot password is showing appropriate message for not registered with macmillan account e-mail address
        Given I have opened "Achieve-CW"
        When I click on Forgot link 
        And I login with non registered user credentials and <verify> the following message is displayed for not registered user 
            | Username          | message |
            | emily@gmail.com   | If we were able to find an account matching that email address, we have emailed you a link to reset your password. Be sure to look in your junk and spam folders for our email.Look for an email from noreply@macmillan.com. If you do not receive an email from us you may have used a different email address.  Please go back and try to sign in using a different email address. |