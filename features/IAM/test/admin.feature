Feature: Authentication for Achieve Admin via IAM
    

    Scenario: Verify Close icon is working fine and verifying password reset is showing error when invalid emailid is entered 
        Given I have opened Achieve "loginURL"
        And I have logged in as "admin"
        When I click on user menu 
        And I click on Admin Panel 
        And I click on Password reset
        And I enter Invalid E-mail Address not regitered in macmillan account
        And I click on Reset button
        Then I click on Close Icon
        And I sign out of Achieve
        
    Scenario:Verifying password reset functionality is working fine
        Given I have opened Achieve "loginURL"
        When I have logged in as "admin"
        And I click on user menu 
        And I click on Admin Panel 
        And I click on Password reset
        Then I enter "admin" account details which is registered in macmillan account
        And I click on Reset button
        And I click on Close Icon
        And I sign out of Achieve


    Scenario: Verify the user is able to luanch the url and reset the password
        # Given I have opened Achieve "ThirdpartyURL"
        # When I log in as "admin"
        When I check E-mail Notification of "admin" for "IAM"
        And I enter Password and confirm password from "admin" account for fulfilling the validation criteria
        And I click on Reset password
        Then I verify reset password Message is displayed as "Your password has been successfully reset. You can now log in to your account."
        Then I click on login button to return to login page

    # Scenario: Verify that user is able to Sign In using new password
    #     Given I have opened Achieve "loginURL"
    #     When I have logged in as "admin"
    #     Then Verify that user is able to login using newly created password
       
    
   









