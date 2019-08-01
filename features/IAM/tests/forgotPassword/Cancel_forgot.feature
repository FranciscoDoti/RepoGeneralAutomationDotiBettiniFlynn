Feature: Verify Forgot Password page Cancel Button redirects to Sign In Page 

    Scenario Outline: Verify Forgot Password page Cancel Button redirects to Sign In Page

         Given I have opened Achieve "signURL"
         When I click on Forgot link
         And I click on Cancel Button

         Then I <verify> that I am redirected to signin page
         Examples: 
         | verify           |
         | "Create Account" | 


