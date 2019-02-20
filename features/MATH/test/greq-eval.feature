Feature: Creating a new AMS raptor item for different Eval types and simulate grading

Scenario Outline: Author creates a <evaltype> <equation> question and simulates grading for correct answer input

  Given I login to AMS
  When I click on the New Raptor item in the AMS page
  And I navigate to AuthorApp tab

  And I select Graded equation and save as <evaltype>
  And I click on the Question tab, and add an Answer field
  And I set the grade as <evaltype> type and input <equation>
  And I save the question

  When I am in Take Mode and input the correct <equation> 
  And I simulate grading
  Then My answer is graded correctly
  Examples:
  | evaltype        | equation     |
  | "Relation"      | "2x+26=0"    |
  | "Expression"    | "x+y"        |