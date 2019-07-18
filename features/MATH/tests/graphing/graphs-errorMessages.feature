Feature: Verify Graph editor error messages

    Background: Login with graphing permission and navigate to Graph tab

        Given I login to AMS as "all-permissions-author"
        And I click on the Graphs tab

    Scenario: Verify the error message for an existing graph id opened in edit mode when user logs out and logs back as non-graph user

        When I click the "window" icon for graphId "289"
        And I go back to sapling page and logout
        And I login to AMS as "non-graph-user"
        And I try to save the previously opened graph editor
        Then I verify window pop up message "Error: Unauthorized"

    Scenario: Verify the error message for a new graph, opened in edit mode and after the user logs out and logs back as non-graph user

        When I click on new Graph button
        And I go back to sapling page and logout
        And I login to AMS as "non-graph-user"
        And I try to save the previously opened graph editor
        Then I verify window pop up message "Error: Unauthorized"

    Scenario: Verify the error message for non-existing graph id by navigating directly to the URL of a graph ID that does not exist.

        When I click the "window" icon for graphId "287"
        And I input non-existing graphid in the graph editor url
        Then I verify window pop up message "Error: An error occurred"

   Scenario: Verify the error message for an existing graph id opened in edit mode after the user logs out and then logs back in and tries to save already opened graph.

        When I click the "window" icon for graphId "287"
        And I go back to sapling page and logout
        And I login back to AMS again as "all-permissions-author"
        And I click on the Graphs tab
        And I try to save the previously opened graph editor
        Then I verify window pop up message "Graph saved. refresh AMS"
