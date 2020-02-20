@IAM
Feature: Verify that footer link are redirecting to appropriate page

    Scenario: Verify that footer link are redirecting to appropriate page

        Given I have opened "Achieve-CW"
        When I click on Forgot link
        When I click on footer link "Privacy Notice" 
        Then I verify "Macmillan Learning Privacy and Cookie Notice" is displayed on "Privacy Notice" page
        When I click on footer link "Terms of Purchase" 
        Then I verify "U.S. Store Terms of Purchase / Rental" is displayed on "Terms of Purchase" page
        When I click on footer link "Piracy" 
        # Then I verify "Anti-Piracy Form" is displayed on "Anti-Piracy" page
        When I click on footer link "Help"
        Then I verify "How Can We Help?" is displayed on "Home" page
        When I click on footer logo "Macmillan Learning"
        Then I verify "Achieve More." is displayed on page