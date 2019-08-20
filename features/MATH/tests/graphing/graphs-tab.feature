@math @graph @graph-tab @smoke
Feature: Verify the elements on Ams-Graph Tab page

    Background: AMS-Graph tab

        Given I login to AMS as "all-permissions-author"
        When I click on the Graphs tab

    Scenario: Verify list of Graphs, their column fields

        Then I verify new Graph button and static column names are displayed
        And I verify Graph type is Graded or Ungraded

    Scenario: Verify graph filter field

        And I verify graph filter field
        And graphs list with alphanumeric characters or empty title exist

    Scenario Outline: Verify graph filter numeric search
        #Test Cases: C3218235
        When I input <userText> in the filter field
        Then I verify all graphs that have <userText> in the graph title or in graph Id are displayed

        Examples:
            | userText |
            | "g"      |
            | "24"     |

## yet to be implemented sprint story
# Scenario: Verify graph filter for case sensitive search

#          When I input "abc" in the filter field
#         Then I verify all graphs have "abc" in the graph title or in graph Id are displayed