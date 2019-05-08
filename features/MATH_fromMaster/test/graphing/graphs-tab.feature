Feature: Verify the elements on Ams-Graph Tab page

    Background: AMS-Graph tab

        Given I login to AMS as "all-permissions-author" with "password"
        When I click on the Graphs Tab

    Scenario: Verify list of Graphs, their column fields

        Then I verify new Graph button and static column names are displayed
        And I verify Graph type is Graded or Ungraded

    Scenario: Verify graph filter field

        And I verify graph filter field
        And graphs list with title containing alphanumeric characters exist

    Scenario Outline: Verify graph filter numeric search
    #Test Cases: C3218235

        When I input <userText> in the filter field
        Then I verify all graphs that have <userText> in the graph title or in graph Id are displayed

        Examples:
            | userText  |
            | "6"       |
            | "24"      |
            | "sul"     |
            | "1.2 Fig" |
            | "#$%"     |
            | "1.4"     |

## next sprint story
# Scenario: Verify graph filter for case sensitive search  

#          When I input "abc" in the filter field
#         Then I verify all graphs have "abc" in the graph title or in graph Id are displayed