@IAM
Feature: Verify that footer link are redirecting to appropriate page

    Scenario: Verify that footer link are redirecting to appropriate page

        Given I have opened Achieve "Achieve-CW"
        
        When I click on footer link "Privacy" 
        Then I verify "Privacy Notice" and "Macmillan Learning Privacy and Cookie Notice" is displayed

        When I click on footer link "Terms of Purchase" 
        Then I verify "Terms of Purchase" and "U.S. Store Terms of Purchase / Rental" is displayed

        When I click on footer link "Piracy" 
        Then I check "Anti-Piracy" and "Anti-Piracy Form" is displayed

        When I click on footer link "Help" 
        Then I verify "Home" and "How Can We Help?" is displayed

        When I click on footer link "macmillanlearning.com" 
        Then I verify "Macmillan Learning for Instructors" and "Achieve More." is displayed                            
          

