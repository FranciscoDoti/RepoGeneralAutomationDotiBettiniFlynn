Feature: Forgot link is redirected to forgot page

    Scenario Outline: Verify Forgot? Link is redirecting to forgot password page 

        Given I have opened Achieve "signURL"
        When I click on Forgot link
        
        Then I <verify> that I am redirected to forgot page
        | verify            |
        | "Email Address"   |


