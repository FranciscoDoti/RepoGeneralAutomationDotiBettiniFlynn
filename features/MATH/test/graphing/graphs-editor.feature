Feature: New graph editor

    Scenario: Verifies new graph button opens unsaved graph in a new tab

        Given I login to AMS as "all-permissions-author" with "password"
        When I click on the Graphs Tab
        When I click on Graph button
        Then I verify new graph editor opens in a new tab with that tab in focus
        And I verify the new unsaved graph url, graph ID does not contain graph Id number