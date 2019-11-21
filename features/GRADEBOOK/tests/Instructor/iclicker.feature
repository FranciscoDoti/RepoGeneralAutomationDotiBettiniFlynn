@Gradebook @Smoke @GradebookSmoke @GradebookIClicker
Feature: Instructor adds and removes Categories

  Scenario: Instructor connects to iClicker
    Given Instructor views the Gradebook for "iclicker_skills1" as "instructor_8"
    When Instructor connects to iClicker
    Then The new course button should be visible
