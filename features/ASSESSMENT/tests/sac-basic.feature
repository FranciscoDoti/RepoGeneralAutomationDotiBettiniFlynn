Feature: To configure a basic test in SAC

  @SAC @Assessment @Smoke
  Scenario: User navigates to an existing assessment

    Given I login to IBISCMS as "raptor-instructor"
    When I navigate to assignment preview
    Then The assignment preview is opened in a new tab
    
    