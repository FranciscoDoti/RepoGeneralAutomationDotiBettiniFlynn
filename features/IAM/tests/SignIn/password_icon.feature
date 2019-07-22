Feature: Verify password info Icon

    Scenario Outline: Verify that password info icon tooltip Information is consistent to application behavior

        Given I have opened Achieve "signURL"
        When I hover on password "i" 

        Then I <verify> the password as following information 
        Examples:
            | verify                                                                                                                                                          |
            | "Passwords must contain at least:8 - 72 characters.8 - 72 characters.1 lowercase letter.1 uppercase letter.1 number or special character: ! @ # $ % - _ = + < >"|

