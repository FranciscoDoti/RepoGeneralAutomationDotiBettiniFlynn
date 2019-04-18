Feature: Verify the elements on Ams-Graph Tab page

    Scenario: Verify list of Graphs, their column fields

        Given I login to AMS as "all-permissions-author" with "password"
        When I click on the Graphs Tab
        Then I verify Graph button and static column names are displayed
        And I verify Graph type is Graded or Ungraded