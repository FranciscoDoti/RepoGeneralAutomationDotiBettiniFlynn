@DeletedItemsPage
Feature: Tests on DeletedItems Page of AMS

    Scenario: Apply column and text filter on DeletedItemsPage and verify that items match with the filter applied
        Given I login to AMS as "all-permissions-author"
        When I click on Deleted Items
        And I apply the following filters on DeletedItems page
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
        And I apply the following text filter "Raptor" on DeletedItems page
        Then I verify that the items match with the filters applied
        
    Scenario: Apply filters on DeletedItemsPage and verify that items match with the filter applied
        Given I login to AMS as "all-permissions-author"
        When I click on Deleted Items
        And I apply the following filters on DeletedItems page
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
        Then I verify that the items match with the filters applied


