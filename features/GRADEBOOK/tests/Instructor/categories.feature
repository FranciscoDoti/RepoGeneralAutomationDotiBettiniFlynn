@Gradebook @Smoke @GradebookCategories
Feature: Instructor adds and removes Categories

  Scenario: Instructor adds and removes categories Gradebook
    Given Instructor views the Gradebook for "course_1" as "instructor_8"
    When Instructor opens the settings modal
    And Instructor deletes all categories
    And Instructor saves a new category
    Then A new category should appear in the Gradebook
    When Instructor opens the settings modal
    And Instructor deletes all categories
    Then No categories should appear in the Gradebook






