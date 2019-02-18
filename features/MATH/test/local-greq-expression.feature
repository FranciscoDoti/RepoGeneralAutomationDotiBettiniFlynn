Feature: Creating a new AMS raptor item for eval type Expression

Scenario: User creates a Expression type graded equation x+y module and grades correct answer

  Given I login to "local" login page as "gozer"
  When I am in the AMS page
  And I click on the New Raptor item

  When I am on the AuthorApp item page
  And I select Graded equation and save as "exprGrad"
  And I click on the Question tab, and add an Answer field
  And I set the grade as Expression type and input "math-eqn" equation
  And I save the question

  When I am in Take Mode and input the correct equation "x+y"
  And I simulate grading
  Then My answer is graded correctly