@math @graph @graph-editor
Feature:  New graph editor

    Background: Login with graphing permission and navigate to Graph tab

        Given I login to AMS as "all-permissions-author"
        When I click on the Graphs tab
        Then I verify new Graph button and static column names are displayed

    Scenario: Verifies page elements of Graph editor
        # Test cases: C3183357

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        And I verify all the page elements blank ID, untitled text, buttons and right hand and left hand expression panels

    Scenario: Verifies new graph button opens unsaved graph in a new tab

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        And I verify the graph editor "url" has "no" graph Id number
        And I verify the graph editor "ID" has "no" graph Id number

    Scenario:  Verifies the graph url ID when an existing graph is open from window icon

        When I create a new graph with the following details
            | Title         | GraphingExpression |
            | TrigFig 5.1   | sec(x)+x           |
        And I click the "window" icon for the graphId
        Then I verify the graphId editor will open in a new tab in edit mode
        And I verify the graph editor "url" has "a" graph Id number

    Scenario: Verifies the graph url when an existing graph is open from preview icon

        When I create a new graph with the following details
            | Title         | GraphingExpression |
            | TrigFig 5.2   | csc(x)+x           |
        And I click the "preview" icon for the graphId
        Then I verify the graph editor will open in a new tab in student preview mode
        And I verify the graph editor "url" has "a" graph Id number

    Scenario: Verifies title input field is focused when title edit button is clicked

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        When I click on the title edit button
        Then the title input box is focused

    Scenario: Verifies title input field can take any characters

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        When I click on the title edit button
        Then the title input box is focused
        And I can type in any character "544&*#@32dfd"

    Scenario: Verifies Student Preview mode parameters

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        When I click on the student preview button
        Then I verify author panels and controls not visible and graph is displayed with student header bar

    Scenario: Verifies addition of new row in AMS tab when a new graph is saved
        # Test Cases: C3191303

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        When I input "TrigFig 5.3" title
        And I click the Save button
        Then the Save button text changes to Saved with a checkmark
        And I verify the graph editor "url" has "a" graph Id number
        And I verify the graph editor "ID" has "a" graph Id number
        And I verify the AMS Graph tab contains the new row for the graph with the new ID

    Scenario: Verifies Save button text change when graph is saved and edited

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        When I input "TrigFig 5.4" title
        And I click the Save button
        Then the Save button text changes to Saved with a checkmark
        When I make any changes to title "Fig 5.4"
        Then I verify Save button text changes from Saved to Save