@Smoke @Gradebook @GradebookViewGradebook
Feature: Instructor views the Gradebook

  Scenario: Instructor views the Gradebook
    Given I login to Achieve-CW as "instructor_8"
    And navigate to my course using course "course_1"
    And I click the Gradebook menu link
    Then I should see the settings button appear

  Scenario: Instructor toggles percent to points Gradebook
    Given I login to Achieve-CW as "instructor_8"
    And navigate to my course using course "course_1"
    And I click the Gradebook menu link
    Then I should see percents displayed in the course total
    When I toggle points
    Then I should see points displayed in the course total
    When I toggle percents
    Then I should see percents displayed in the course total


