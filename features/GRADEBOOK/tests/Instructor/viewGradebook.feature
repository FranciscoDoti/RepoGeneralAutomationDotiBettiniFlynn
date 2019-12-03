@Gradebook @Smoke @GradebookViewGradebook
Feature: Instructor views the Gradebook

  Scenario: Instructor views the Gradebook
    Given Instructor views the Gradebook for "course_1" as "instructor_8"
    Then The settings button is visible

  Scenario: Instructor toggles percent to points Gradebook
    Given Instructor views the Gradebook for "course_1" as "instructor_8"
    Then Percents are displayed in the course total
    When Instructor toggle points
    Then Points are displayed in the course total
    When Instructor toggle percents
    Then Percents are displayed in the course total


