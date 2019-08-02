@math @graph @graph-error
Feature: Verify Graph editor error messages

    Background: Login with graphing permission and navigate to Graph tab

        Given I login to AMS as "all-permissions-author"
        And I click on the Graphs tab

    Scenario: Verify the error message for an existing graph id opened in edit mode when user logs out and logs back as non-graph user
        # Replaced the hard coded graphId with step functions to create new graphsIds so that they can be used in the scenario steps

        When I create a new graph with the following details
        |   Title           |   GraphingExpression  |
        |   TrigFigEr 2.1   |   csc(x)+x            |
        When I click the "window" icon for the graphId
        And I go back to sapling page and logout
        And I login to AMS as "non-graph-user"
        And I try to save the previously opened graph editor
        Then I verify window pop up message "Error: Unauthorized"

    # Scenario: Verify the error message for a new graph, opened in edit mode and after the user logs out and logs back as non-graph user

    #     When I click on new Graph button
    #     And I go back to sapling page and logout
    #     And I login to AMS as "non-graph-user"
    #     And I try to save the previously opened graph editor
    #     Then I verify window pop up message "Error: Unauthorized"

    # Scenario: Verify the error message for non-existing graph id by navigating directly to the URL of a graph ID that does not exist.
    #     # Replaced the hard coded graphId with step functions to create new graphsId so that they can be used in the scenario steps

    #     When I click on new Graph button
    #     And I input graphing expression "sec(x)+x^4"
    #     And I input "TrigFigEr 2.2" title
    #     And I click the Save button
    #     And I close the tab
    #     When I click the "window" icon for the graphId
    #     And I input non-existing graphid in the graph editor url
    #     Then I verify window pop up message "Error: An error occurred"

    # Scenario: Verify the error message for an existing graph id opened in edit mode after the user logs out and then logs back in and tries to save already opened graph.
    #     # Replaced the hard coded graphId with step functions to create new graphsId so that they can be used in the scenario steps

    #     When I click on new Graph button
    #     And I input graphing expression "xcot(x)"
    #     And I input "TrigFigEr 2.3" title
    #     And I click the Save button
    #     And I close the tab
    #     When I click the "window" icon for the graphId
    #     And I go back to sapling page and logout
    #     And I login back to AMS again as "all-permissions-author"
    #     And I click on the Graphs tab
    #     And I try to save the previously opened graph editor
    #     Then I verify window pop up message "Graph saved. refresh AMS"
