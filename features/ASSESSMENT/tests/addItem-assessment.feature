Feature: As a user, I want to add an item to an assessment

Scenario: Add an item to a new assignment
    Given I login to an existing course as "all-permissions-author"
    And I create a new assessment with its necessary details
    When I have added an item to assessment
    Then I see the item present in the assessment