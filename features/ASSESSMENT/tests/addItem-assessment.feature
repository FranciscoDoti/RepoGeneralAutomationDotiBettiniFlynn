Feature: As a user, I want to add an item to an assessment

@assessmentCreation
Scenario: Add an item to a new assignment
    Given I login to IBISCMS as "all-permissions-author"
    And navigate to a course having course id "21038"
    And I create a new assessment with its necessary details
    |Assessment_Name | Assessment_Description| 
    |QAAssessment | This is automated test assessment|
    When I have created "1" random questions
    And added it to assessment
    Then I see the item present in the assessment

@assessmentCreation
Scenario: Add multiple random items to a new assignment
    Given I login to IBISCMS as "all-permissions-author"
    And navigate to a course having course id "21038"
    And I create a new assessment with its necessary details
    |Assessment_Name | Assessment_Description| 
    |QAAssessment | This is automated test assessment|
    When I have created "3" random questions
    And added it to assessment
    Then I see the item present in the assessment