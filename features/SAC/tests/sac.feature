Feature: To configure a basic test in SAC

  Scenario: User creates a new AMS raptor item and configures it

    Given I login to IBISCMS as "raptor-instructor"
    When I navigate to assignment preview
    Then I the assignment preview is opened in a new tab
    
    