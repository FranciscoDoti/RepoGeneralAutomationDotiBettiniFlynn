@local
@skip
@Reading
Feature: Launch Reading

    Scenario: An admin opens a reading
        Given I open a reading
            # Then there should be ebook content
            When I type 42 in the page number input
