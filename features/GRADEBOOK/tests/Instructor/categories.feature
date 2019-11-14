@Smoke @Gradebook
Feature: Instructor adds and removes Categories

  Scenario: Instructor adds a category Gradebook
    Given I login to Achieve-CW as "instructor_8"
    And navigate to my course using course "course_1"
    And I click the Gradebook menu link
    And I open the settings modal
    When I save a new category
    Then A new category should appear in the Gradebook




