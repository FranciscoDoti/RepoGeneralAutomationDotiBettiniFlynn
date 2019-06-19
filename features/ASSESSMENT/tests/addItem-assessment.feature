Feature: As a user, I want to add an item to an assessment

Scenario: Add an item to a new assignment
    Given I login to an existing course as "all-permissions-author"
    And I create a new assessment with its necessary details
    |Assessment_Name |
    |QAAssessment    |
    When I have added "1" random item to assessment
    Then I see the item present in the assessment

# Scenario: Add multiple random items to a new assignment
#     Given I login to an existing course as "all-permissions-author"
#     And I create a new assessment with its necessary details
#     |Assessment_Name| Assessment_Description| 
#     |Assessment | This is automated test assessment|
#     When I have added "5" random item to assessment
#     Then I see the item present in the assessment