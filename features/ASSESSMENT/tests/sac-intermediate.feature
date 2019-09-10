@Assessment @SAC @Smoke
Feature: To configure an intermediate test in SAC

  Scenario: Student navigates to an existing assessment

    Given I login to IBISCMS as "raptor-student"
    When I navigate to assignment and go back to the course landing page
    Then The course landing page is loaded
