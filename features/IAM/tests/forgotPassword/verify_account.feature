Feature: Message displayed for not registered user

    Scenario: Verify that forgot password is showing appropriate message for not registered with macmillan account e-mail address

        Given I have opened Achieve "Achieve-CW"
        When I click on Forgot link 
        And I login with non registered user credentials and <verify> the following message is displayed for not registered user 
            | Username          | verify |
            | emily@gmail.com   | "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again." |
        
    

