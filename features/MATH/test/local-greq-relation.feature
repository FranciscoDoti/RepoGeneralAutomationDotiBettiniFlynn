Feature: Creating a new AMS raptor item for eval type Relation

Scenario: User creates a Relation type graded equation module and grades answer
  
  Given I login to "local" login page as "gozer"
  When I am in the AMS page
  And I click on the New Raptor item

  When I am on the AuthorApp item page 
  And I select Graded equation and save as "relationGrad"
  And I click on the Question tab, and add an Answer field
  And I set the grade as Relation type and input "math-eqn" equation
  And I save the module
  
  When I am in Take Mode and input the correct answer
  And I simulate grading
  Then My answer is graded correctly