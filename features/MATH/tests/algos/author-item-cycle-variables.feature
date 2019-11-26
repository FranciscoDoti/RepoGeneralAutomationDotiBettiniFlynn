@math @algo
Feature: Author loads raptor item and cycles variables

  Scenario: Author loads existing Raptor item and cycles variables without triggering algo-init error
    
    Given I login to AMS as "all-permissions-author"
    When I am on the AMS page and search for the item ids
    | itemId|
    | 25336 |
    | 74702 |
    | 74906 |
    | 74985 |
    | 85765 |
    | 90156 |
    | 91628 |

# Then I verify no window pop up message is displayed
