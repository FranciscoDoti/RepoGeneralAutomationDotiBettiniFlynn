Feature: CEE module type creation
    Scenario: Verify that user can create CEE type of raptor item

    Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp tab
        And I added "Chemical Equation" module from the Add module pallete
        And I select the canvas to add the selected module
        And I save the item as draft
        And I navigate back to AMS landing page
        Then I verify item has been created
      # When I added "Chemical Equation" module from the Add module pallete
    #    And I select the canvas to add the selected module 
    #    And I try to save the item
    #    Then I navigate back to AMS landing page
    #    And I see the new raptor item in the items listing with following details
    #    | coloumn_name| value|
    #    | Author      | Raptor Admin |
    #    | Status      | In Progress  |
    #    | Module Type | CEE          |

