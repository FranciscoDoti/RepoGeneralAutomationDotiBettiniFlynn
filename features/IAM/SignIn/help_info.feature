Feature: Verify Help info icon information

    Scenario Outline: Verify that help info icon tooltip Information is consistent to application behavior

        Given I have opened Achieve "signURL"
        When I hover on help icon "?" 

        Then I <verify> the help as following information 
        Examples:
            | verify                                                                                                                                                          |
            | "Check your email (and spam folder) for your original welcome email. Your user name is your email address."|
