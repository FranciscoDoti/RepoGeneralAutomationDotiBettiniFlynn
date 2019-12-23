@Gradebook @Smoke @GradebookIClicker
Feature: Instructor adds and removes Categories

  Scenario: Instructor connects and disconnects from iClicker
    Given Instructor views the Gradebook for "iclicker_skills1" as "instructor_8"
    When Instructor connects to iClicker
    Then The iclicker menu should be visible
    When Instructor disconnects to iClicker
    Then The sync button should be visible

  Scenario: Instructor goes to iClicker Cloud
    Given Instructor views the Gradebook for "iclicker_skills1" as "instructor_8"
    When Instructor connects to iClicker
    Then The manage iClicker button should be displayed

  Scenario: Instructor syncs a students grade
    Given Instructor views the Gradebook for "iclicker_skills1" as "instructor_8"
    When Instructor connects or stays connected to iClicker
    Then I verify the grades for students
      | student      | row | column | grade |
      | student2 | 1   | 1      | 100%  |
      | student2 | 1   | 2      | 0%  |
      | student2 | 1   | 3      | 50%  |
