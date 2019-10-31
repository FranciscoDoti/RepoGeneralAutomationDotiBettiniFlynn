@GetEnvironment
@achieve
@Reading
Feature: Launch Reading

    Scenario: An admin opens a reading
        Given I login to Achieve-CW as "admin_1"
            When I search for "Reading Automation" and click on course card
            When I launch a reading
            Then there should be ebook content

    Scenario: User can see the notebook
        Given I login to Achieve-CW as "admin_1"
            When I search for "Reading Automation" and click on course card
            When I launch a reading
            When I click on the "Notebook Tab"
                Then there should be a "Annotation List" that includes the text "Empty Notebook"
