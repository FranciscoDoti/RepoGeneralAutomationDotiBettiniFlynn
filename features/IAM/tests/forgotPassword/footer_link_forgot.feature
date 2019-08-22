@IAM  @WIP
Feature: Verify that footer link are redirecting to appropriate page

    Scenario: Verify that footer link are redirecting to appropriate page

        Given I have opened "Achieve-CW"
        When I click on Forgot link
        When I click on footer link "Privacy Notice" 
        Then I verify "Privacy Notice" and "Macmillan Learning Privacy and Cookie Notice" is displayed
        When I click on footer link "Terms of Purchase" 
        Then I verify "Terms of Purchase" and "U.S. Store Terms of Purchase / Rental" is displayed
        When I click on footer link "Piracy" 
        Then I check "Anti-Piracy" and "Anti-Piracy Form" is displayed
        When I click on footer link "Help" 
        Then I verify "Higher Ed Community" and "How Can We Help?" is displayed
        When I click on footer link "https://www.macmillanlearning.com/college/us/" 
        Then I verify "Macmillan Learning for Instructors" and "Achieve More." is displayed