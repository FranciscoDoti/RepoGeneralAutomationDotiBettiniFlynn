@IAM @failing
Feature: Verify Help info icon information

    Scenario: Verify that help info icon tooltip Information is consistent to application behavior
        
        Given I have opened "Achieve-CW"
        
        When I hover on ? icon 
        Then I ensure Check your email (and spam folder) for your original welcome email. Your user name is your email address. is displayed

       
            
        