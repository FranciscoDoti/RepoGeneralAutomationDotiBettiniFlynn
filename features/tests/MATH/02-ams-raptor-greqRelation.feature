Feature: Creating a new AMS raptor item for eval type Relation

Scenario: Verify sapling AMS page is loaded and navigate to AuthorApp page by clicking new Raptor item link
  Given AMS page is loaded and New Raptoritem button link exists
  Then Author clicks on the Raptor item and navigates to the AuthorApp page

Scenario: Author creates a Graded equation module of eval type: Relation
  Given AuthorApp page is loaded with focus on ItemDetails tab, saved as "test1"
  When user clicks on the Module Tab, and selects the Graded equation
  Then verify the Activity Editor opens up with focus on Question tab
  And the user clicks on the Question tab, adding Answer text field to the tab
  And the user clicks on correct tab, selects Grade As Relation type in Editor panel and inputs "math-Data" equation

Scenario: Author simulates the student Take mode and inputs correct Relation answer 
  Given the author saves the question module
  Then clicks on take mode button and inputs correct answer "math-Data" in the answer field
  When clicks on simulate grading button, the answer is graded correct