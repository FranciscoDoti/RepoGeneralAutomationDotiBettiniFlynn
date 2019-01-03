    # Link validations for Privacy and Piracy ## 

    Scenario: Verify that Terms of use link redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "terms_of_use" element

        Then I verify that the url "https://store.macmillanlearning.com/us/termsOfUse" is the current url in the "current" window


    Scenario: Verify that Privacy Notice Link exists and redirects to appropriate page
        Given I have opened "achieve" "user_creation"
        
        Then I verify that "iam" system "create_account" feature "privacy_notice" element link exists

        When I click on "iam" system "create_account" feature "privacy_notice" element

        Then I verify that the url "https://store.macmillanlearning.com/us/privacy-notice" is the current url in the "new" window
Scenario: Verify the Terms of Purchase link directs to the page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "terms_of_purchase" element
        
        Then I verify that the url "https://store.macmillanlearning.com/us/terms-of-purchase-rental" is the current url in the "new" window

    Scenario: Verify that Piracy Link redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "piracy_link" element
        
        Then I verify that the url "https://www.macmillanlearning.com/Catalog/page/piracy" is the current url in the "new" window

    Scenario: Verify that Privacy Link redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "privacy_link" element
        
        Then I verify that the url "https://store.macmillanlearning.com/us/privacy-notice" is the current url in the "new" window

    Scenario: Verify that macmillan learning redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "macmillan_link" element
        
        Then I verify that the url "https://www.macmillanlearning.com/catalog" is the current url in the "current" window

    