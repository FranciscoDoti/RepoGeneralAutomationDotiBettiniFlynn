@math @smoke
Feature: To save the AMS raptor item

  Scenario Outline: User creates and saves a new AMS raptor item question and save the item id in a file

    Given I login to AMS as "all-permissions-author"
    When I click on the New Raptor item in the AMS page
    And I navigate to AuthorApp

    When I set Item Details name as <evaltype>
    And I add Math equation module
    And I click on the Question tab, and add an Answer field

    And I set the grade as <evaltype> type, with <enforceEndpoints>, <upperTolerance>, <lowerTolerance> and input <questionEquation>
    Then I save the question
    And I note the item Id and save in a temp file

    Examples:
      | evaltype   | questionEquation | answerEquation | enforceEndpoints | upperTolerance | lowerTolerance |
      | "Relation" | "2x+26=0"        | "2x+26=0"      | ""               | ""             | ""             |

  