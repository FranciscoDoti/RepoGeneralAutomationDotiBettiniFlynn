Feature: New graph editor

    Background: Login with graphing permission and navigate to Graph tab

        Given I login to AMS as "all-permissions-author" with "password"
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

        When I click the "window" icon for graphId "14"
        Then I verify the graphId "14" editor will open in a new tab in edit mode
        And I verify the graph editor "url" has "a" graph Id number

    Scenario: Verifies the graph url ID when an existing graph is open from preview icon

        When I click the "preview" icon for graphId "14"
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
        Then I verify right and left hand setting panels, edit and Save buttons are not visible and graph is displayed with "Previewing as Student" in header bar

    Scenario: Verifies addition of new row in AMS tab when a new graph is saved
        # Test Cases: C3191303

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        When I input "AutoGraph11" title
        And I click the Save button
        Then the Save button text changes to Saved with a checkmark
        And I verify the graph editor "url" has "a" graph Id number
        And I verify the graph editor "ID" has "a" graph Id number
        And I verify the AMS Graph tab contains the new row for the graph with the new ID

    Scenario: Verifies Save button text change when graph is saved and edited

        When I click on new Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        When I input "Fig 3.1" title
        And I click the Save button
        Then the Save button text changes to Saved with a checkmark
        When I make any changes to title
        Then I verify Save button text changes from Saved to Save