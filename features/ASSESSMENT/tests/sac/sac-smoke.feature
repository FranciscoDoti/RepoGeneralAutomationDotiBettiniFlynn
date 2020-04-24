@SAC @Assessment @Smoke 
Feature: To configure an intermediate test in SAC

  @Breadcrumb @SACIntermediate
  Scenario: Student navigates to an existing assessment
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
    And I click on "Breadcrumb" "Raptor Automation"
      Then The "Page Title" named "Raptor Automation - Do Not Delete" should be displayed

  @Preview @SACBasic
  Scenario: User navigates to an existing assessment
    Given I login to IBISCMS as "raptor-instructor"
    When I navigate to "SAC Automation - HW" assessment link in "Raptor Automation - Do Not Delete" course
    And I click on "Assignment Button" "Student Preview"
    And I click on "Modal Button" "Keep Attempts and Launch"
        Then The assignment preview is opened in a new tab