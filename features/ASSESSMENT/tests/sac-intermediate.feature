Feature: To configure an intermediate test in SAC

  @Assessment @SAC @Smoke
  Scenario: Student navigates to an existing assessment

    Given I login to IBISCMS as "student_2"
    When I navigate to assignment and go back to the course landing page
    Then The course landing page is loaded
    
    