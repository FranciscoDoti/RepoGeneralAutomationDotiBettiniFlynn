Feature: Verify that footer link are redirecting to appropriate page

    Scenario Outline: Verify that footer link are redirecting to appropriate page

        Given I have opened Achieve "signURL"
        When I click on footer links, I verify that each link is directed to correct page
          Examples:
          | Objects             | pagedef                        | verify                                                        |
          | privacy             | footer_link_verification       | "Privacy and Cookie Notice.Effective Date: December 27, 2018" | 
          | TermsOfPurchase     | footer_link_verification       | "U.S. Store Terms of Purchase / Rental.Modified: July 2017"   |
          | Piracy              | Piracy_verification            | "Anti-Piracy For"                                             |
          | Help                | Help_verification              | "Welcome to.Macmillan Learning Support"                       |
          | macmillanlearning   | macmillanlearning_verification | "achieve more.Your Course. Your Way."                         |

        
          

