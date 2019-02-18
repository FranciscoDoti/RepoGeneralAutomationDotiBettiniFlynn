Feature: Creating a new AMS raptor item for eval type Relation

Scenario: User creates a Relation type graded equation 2x+26=0 module and grades correct answer

  Given I login to "int" login page as "raptor"
  When I am in the AMS page
  And I click on the New Raptor item

  When I am on the AuthorApp item page
  And I select Graded equation and save as "relationGrad"
  And I click on the Question tab, and add an Answer field
  And I set the grade as Relation type and input "math-eqn" equation
  And I save the question

  When I am in Take Mode and input the correct equation "2x+26=0"
  And I simulate grading
  Then My answer is graded correctly