@SAC @Assessment @Regression @LeftNav 
Feature: Validate the functionality of SAC Left Panel

  @QuestionList @QuestionTitles
  Scenario: Verify the question number title in nav question header and side nav title in SAC
    Given I login to IBISCMS as "raptor-student"
    When I navigate to "All Mods" assessment link in "Raptor Automation - Do Not Delete" course
    When I click on "1 Question" in the side nav
      Then I should see "1 of 11 Questions" as the side nav title
      And I should see "Question 1 of 11" as the nav question header
    When I click on "2 Question" in the side nav
      Then I should see "2 of 11 Questions" as the side nav title
      And I should see "Question 2 of 11" as the nav question header
    When I click on "3 Question" in the side nav
      Then I should see "3 of 11 Questions" as the side nav title
      And I should see "Question 3 of 11" as the nav question header
    When I click on "left" arrow in the nav question header
      Then I should see "2 of 11 Questions" as the side nav title
      And I should see "Question 2 of 11" as the nav question header
    When I click on "right" arrow in the nav question header
      Then I should see "3 of 11 Questions" as the side nav title
      And I should see "Question 3 of 11" as the nav question header