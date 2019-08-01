Feature: Verify that footer link are redirecting to appropriate page

    Scenario: Verify that footer link are redirecting to appropriate page

        Given I have opened Achieve "signURL"
        When I click on Forgot link
        And I click on footer links, I verify that each link is directed to correct page
          | Objects                 | verify                                         |
          | Privacy                 | "Macmillan Learning Privacy and Cookie Notice" |  
          | Terms of Purchase       | "U.S. Store Terms of Purchase / Rental"        |
          | Piracy                  | "Anti-Piracy Form"                             |
          | Help                    | "How Can We Help?"                             |
          | macmillanlearning.com   |  "Achieve more"                                |