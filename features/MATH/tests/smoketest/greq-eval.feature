@math @smoke @greq
Feature: Creating a new AMS raptor item for different Eval types and simulate grading for each

  Scenario Outline: Author creates a <evaltype> type <questionEquation> equation and verifies grading for correct answer <answerEquation> input

    Given I login to AMS as "all-permissions-author"
    When I click on the New Raptor item in the AMS page
    And I navigate to AuthorApp

    When I set Item Details name as <evaltype>
    And I add Math equation module
    And I click on the Question tab, and add an Answer field
    And I set the grade as <evaltype> type, with <enforceEndpoints>, <upperTolerance>, <lowerTolerance> and input <questionEquation>
    Then I save the question

    When I simulate student interface
    And I input the answer <answerEquation>
    And I submit answer
    Then the answer is graded correct
    Examples:
      | evaltype     | questionEquation               | answerEquation          | enforceEndpoints | upperTolerance | lowerTolerance |
      | "Relation"   | "2x+26=0"                      | "2x+26=0"               | ""               | ""             | ""             |
      | "Expression" | "x+y"                          | "x+y"                   | ""               | ""             | ""             |
      | "Point"      | "(1,4\pi)"                     | "(3/3,2*2*π)"           | ""               | ""             | ""             |
      | "Interval"   | "(0,0.17)\cup(0.64,1)"         | "[0,1−0.83)∪[64/100,1)" | "unchecked"      | ""             | ""             |
      | "Vector"     | "\left\langle0.768,0,−0.640\right\rangle" | "⟨0.768,0,−0.640⟩" | ""         | "0.0006"       | "0.0006"       |
      | "Parametric" | "(4t,3-t)"                     | "(2t+2t,3*1−t*1)"       | ""               | ""             | ""             |