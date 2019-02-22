Feature: To save the AMS raptor item

Scenario Outline: User creates and saves a new AMS raptor item question and save the item id in a file

  Given I login to AMS
  When I click on the New Raptor item in the AMS page
  And I navigate to AuthorApp tab
  And I create a new graded <evaltype> <questionEquation> and save the question
  Examples:
  | evaltype        | questionEquation     |
  | "Expression"      | "2x+26"            |   