@Gradebook @Smoke @GradebookIClicker
Feature: Instructor adds and removes Categories

  Scenario: Instructor connects to iClicker
    Given Instructor views the Gradebook for "iclicker_skills1" as "instructor_8"
    When Instructor connects to iClicker
    Then The iclicker menu should be visible

  Scenario: Instructor disconnects to iClicker
    Given Instructor views the Gradebook for "iclicker_skills1" as "instructor_8"
    When Instructor disconnects to iClicker
    Then The sync button should be visible