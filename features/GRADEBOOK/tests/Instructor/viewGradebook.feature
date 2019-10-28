@Smoke @Gradebook
Feature: Admin views the Gradebook

  Scenario: Admin views the Gradebook
    Given I login to Achieve-CW as "instructor_8"
    And navigate to my course using course id "bdvsyb"
    When I click the Gradebook menu link
    Then I should see the settings button appear
