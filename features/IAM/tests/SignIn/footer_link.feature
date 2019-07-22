Feature: Verify that footer link are redirecting to appropriate page

    Scenario: Verify that footer link are redirecting to appropriate page

        Given I have opened Achieve "signURL"
        When I click on footer links
          | Objects             |
          | privacy             |   
          | TermsOfPurchase     |
          | Piracy              |
          | Help                |
          | macmillanlearning   |

        Then I verify that each link is directed to correct page
            |  pagedef                       | verify                                                        |
            |  footer_link_verification      | "Privacy and Cookie Notice.Effective Date: December 27, 2018" |
            |  footer_link_verification      | "U.S. Store Terms of Purchase / Rental.Modified: July 2017"   |
            |  Piracy_verification           | "Anti-Piracy For"                                             |
            |  Help_verification             |  "Welcome to.Macmillan Learning Support"                      |
            | macmillanlearning_verification | "achieve more.Your Course. Your Way."                         |


