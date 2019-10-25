@skip
@GetEnvironment
@local
@Reading
Feature: Launch Reading

    Scenario: Check that an ebook loads
        Given I open a reading
            Then there should be ebook content

    Scenario: User can see the notebook
        Given I open a reading
            When I click on the "Notebook Tab"
                Then there should be a "Annotation List" that includes the text "Empty Notebook"
