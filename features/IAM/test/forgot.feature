Feature: forgot


Background: 
        Given I have opened Achieve "signURL"
        When I click on the Sign In button on the Home page 

    Scenario: Verify Forgot Password page cancel Button redirects to Sign In Page
        When I click on forgot link
        When I click on cancel button
        Then I Verify Sign In page should be displayed

    Scenario: Verify that email info icon tooltip Information is consistent to application behavior
        When I hover on "?" icon
        Then I verify that forgot email info icon tooltip Information is consistent to application behavior

    Scenario: Verify that forgot password is showing appropriate message for not registered with macmillan account e-mail address
        When I click on forgot link
        And I enter the emailaddress of the account which is not registered in macmillan
        And click on reset password button
        Then I Verify Error message should be displayed

    Scenario: Verify that forgot password functionality working fine for existing macmillanaccounts 
        When I click on forgot link
        And I enter existed created e-mail address of "admin_alt" which is registered to Macmillan account
        And click on reset password button
        And I enter security question from "admin_alt" account 
        And click on submit button
        Then I Verify Confirmation page says "An email has been sent to you with instructions on how to reset your password." 
        Given I have opened Achieve "ThirdpartyURL"
        When I log in as "admin_alt"
        When I check E-mail Notification
        And I enter Password and confirm password from "admin_alt" account for fulfilling the validation criteria
        And I click on Reset password
        Then I verify Message is displayed as "Your password has been successfully reset. You can now log in to your account" 


    Scenario: I create an account every time I run the script for newly created account 
        When I click on create an account button
        And I create account "new_user" in macmillan
        And I sign out of Achieve

    Scenario: Verify that forgot password functionality working fine for newly created macmillan accounts
        When I click on forgot link
        And I enter newly created e-mail address which is registered to Macmillan account
        And click on reset password button
        And I enter security question from "new_user" account
        And click on submit button 
        Then I Verify Confirmation message


    Scenario: Verify that security questions incorrect attempt shows appropriate error messages and not allow user to move further
        When I click on forgot link
        And I enter existed created e-mail address of "instructor_2" which is registered to Macmillan account
        And click on reset password button
        And I Enter incorrect Security question answer 1
        And click on submit button
        Then I Verify Error Message is displayed as_ "Your answer was not correct. You have 2 attempts left before your user account is temporarily locked."
        And I Enter incorrect Security question answer 2 
        And click on submit button
        Then I Verify Error Message is displayed as_ "Your answer was not correct. You have 1 attempt left before your user account is temporarily locked."
        And I Enter incorrect Security question answer 3 
        And click on submit button
        Then I Verify Error Message is displayed as_ "Your Macmillan Learning Student Store account has been temporarily locked because an attempt was made to log in without the correct authentication. Please try again in 15 minutes."
        And I have logged in as "instructor_2"
        And I Verify Error Message is displayed as_ "Your Macmillan Learning Student Store account has been temporarily locked because an attempt was made to log in without the correct authentication. Please try again in 15 minutes."


    Scenario: Verify that security questions incorrect attempt shows appropriate error messages and not allow user to move further(with one correct question and answer)
        When I click on forgot link
        And I enter existed created e-mail address of "instructor_2" which is registered to Macmillan account
        And click on reset password button
        And I Enter incorrect Security question answer 1 
        And click on submit button
        Then I Verify Error Message is displayed as_ "Your answer was not correct. You have 2 attempts left before your user account is temporarily locked"
        And I enter security question from "instructor_1" account
        And click on submit button
        Then I Verify Confirmation page says "An email has been sent to you with instructions on how to reset your password." 

    Scenario:Verify Help Link is present on the Forgot password page and redirecting to appropriate page 
        When I click on forgot link
        And I click on help 
        Then I Verify that Help Page is displayed










