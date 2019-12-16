@Gradebook @Smoke @GradebookFilter
Feature: Instructor adds and removes Categories

  Scenario: Instructor filters assignments by date range
    Given Instructor views the My Course for "filter_test" as "instructor_8"
    And Instructor unassigns activity "Google" in courseplanner
    And Instructor assigns everyone to activities in courseplanner
      | activity  | points | category          | isPastDue | exceptionStudent |
      | Google    | 10     | Drop Lowest Grade | true      |                  |
    And navigate to Gradebook using course "filter_test"
    When Instructor filters on the last 7 days
    Then Only Google URL Link should display



