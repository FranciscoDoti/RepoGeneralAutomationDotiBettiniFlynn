@IAM @failing
Feature: Verify password info Icon

    Scenario: Verify that password info icon tooltip Information is consistent to application behavior

        Given I have opened "Achieve-CW"
        
        When I hover on i icon 
        Then I certify Passwords must contain at least:8 - 72 characters1 lowercase letter1 uppercase letter1 number1 special character: ! @ # $ % ^ & * ( ) _ + | ~ - = \ ` { } [ ] : " ; ' ( ) ? , / is displayed
        

