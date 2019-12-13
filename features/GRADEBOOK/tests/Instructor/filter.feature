@Gradebook @Smoke @GradebookFilter
Feature: Instructor adds and removes Categories

  Scenario: Instructor filters assignments by date range
    Given Instructor views the My Course for "filter_test" as "instructor_8"
    And Instructor assigns students to activities in courseplanner
      | activity  | points | student      | category          | isPastDue | exceptionStudent |
      | Google    | 10     | Everyone     | Drop Lowest Grade | true      |                  |
    And navigate to Gradebook using course "filter_test"
    When Instructor filters on the last 7 days
    Then Only the assignment "Google" should be visible



