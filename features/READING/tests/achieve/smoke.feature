@achieve
@Reading
Feature: Launch Reading

    Scenario: An admin opens a reading
        Given I login to Achieve-CW as "admin_1"
            When I search for "Reading Automation" and click on course card
            When I launch a reading
            Then there should be ebook content
            # When I type 42 in the page number input
