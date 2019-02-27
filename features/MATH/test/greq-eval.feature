Feature: Creating a new AMS raptor item for different Eval types and simulate grading for each

Scenario Outline: Author creates a <evaltype> type <questionEquation> equation and verifies grading for correct answer <answerEquation> input

  Given I login to AMS
  When I click on the New Raptor item in the AMS page
  And I navigate to AuthorApp tab

  And I select Graded equation and save as <evaltype>
  And I click on the Question tab, and add an Answer field
  And I set the grade as <evaltype> type, with <enforceEndpoints> and input <questionEquation>
  Then I save the question and verify saving message box

  When I am in Take Mode and input the correct <answerEquation> 
  And I simulate grading
  Then My answer is graded correctly
  Examples:
  | evaltype          | questionEquation         | answerEquation                     | enforceEndpoints   |
  | "Relation"        | "2x+26=0"                | "2x+26=0"                          |   "NA"             | 
  | "Expression"      | "x+y"                    | "x+y"                              |   "NA"             |
  | "Point"           | "(1,4\pi)"               | "(3/3,2*2*π)"                      |   "NA"             |
  | "Interval"        | "(0,0.17) \cup (0.64,1)" | "[0,1-0.83)∪[64/100,1)"            |  "unchecked"       |