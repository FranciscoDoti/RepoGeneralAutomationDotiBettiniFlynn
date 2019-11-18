@Gradebook @Smoke @GradebookSmoke @GradebookCategories
Feature: Instructor adds and removes Categories

  Scenario: Instructor adds and removes categories Gradebook
    Given I login to Achieve-CW as "instructor_8"
    And navigate to my course using course "course_1"
    And I click the Gradebook menu link
    And I open the settings modal
    When Instructor deletes all categories
    And Instructor saves a new category
    Then A new category should appear in the Gradebook
    Given I open the settings modal
    When Instructor deletes all categories
    Then No categories should appear in the Gradebook






