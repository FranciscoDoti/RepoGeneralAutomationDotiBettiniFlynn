Feature: Verify password info Icon

    Scenario: Verify that password info icon tooltip Information is consistent to application behavior

        Given I have opened Achieve "Achieve-CW"
        
        When I hover on "i" icon 
        Then I verify Passwords must contain at least:8 - 72 characters.8 - 72 characters.1 lowercase letter.1 uppercase letter.1 number or special character: ! @ # $ % - _ = + < > is displayed
        

