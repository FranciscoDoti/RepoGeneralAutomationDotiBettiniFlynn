Feature: As an instructor/ admin, i should be able to create pools of questions

Background: Navigate to Activity Editor

    Given I login to an existing course as "all-permissions-author"
    And I create a new assessment with its necessary details
    |Assessment_Name| Assessment_Description| 
    |Assessment | This is automated test assessment|

Scenario: Create pools in Question Bank and add it to assessmnet
    When I select "5" random questions
    And added it to new assessment as pool
    Then I see a pool of questions is created in the assessment


# Scenario: Create pools in Assessment 