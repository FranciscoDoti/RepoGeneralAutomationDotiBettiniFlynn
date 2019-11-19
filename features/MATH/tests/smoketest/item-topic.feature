@math @smoke 
Feature:  Edit/set the item Topic

    Scenario: Selecting Topic

        Given I login to AMS as "all-permissions-author"
        When I click on the New Raptor item in the AMS page
        And I navigate to AuthorApp

        When I click Edit under Topic section in Item Details window
        Then the subjects are displayed

        When I select Rogawski 5.3 section under Calculus and confirm
        Then I verify the selected section shows under the Topic category
        And I submit Item Details