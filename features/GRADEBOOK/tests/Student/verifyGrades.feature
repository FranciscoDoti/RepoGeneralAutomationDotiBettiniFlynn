@Gradebook @Smoke
Feature: Verify grade and exception accuracy
  Grades always appear correct under different exceptions and assignments

  Background:
    Given I login to Achieve-CW as "admin_1"
    When I create an activated template called "Student Grades Template" with the following data
      | courseType | productModel | courseCode | isbnNumber    | courseStatus |
      | Template   | Skills       | E2E 301    | 9781464199498 | draft        |
    Then I verify my template is active

    When I add the following activities to my template
      | activity        |
      | GLOSSARY        |
      | LC1551301608988 |
    And I add URL link to my course
      | link                   |
      | https://www.google.com |
    And I convert my template into a course
    And I assign "instructor_gb" to my course
    And I activate my course
    And I enroll the following students in my course
      | student      |
      | student_gb_1 |
      | student_gb_2 |
      | student_gb_3 |
      | student_gb_4 |
    And I sign out of Achieve

  @admin-delete-course-and-template
  Scenario: Verify that Instructor is able to assign the activities in Skills Production Course
    Given I login to Achieve-CW as "instructor_gb"
    And I add the activities in courseplanner to my course
      | activity        |
      | LC1551301608988 |
      | GLOSSARY        |
    And I close the popup message
    And I assign the activities in courseplanner
      | activity        | Points |
      | LC1551301608988 | 10     |
      | GLOSSARY        | 10     |
    Then I verify that activities are assigned
      | activity        | Status |
      | LC1551301608988 | Open   |
      | GLOSSARY        | Open   |

    When I edit students grades
      | student      | editGrade |
      | student_gb_1 | 9.5       |
    Then I verify the grades and totals for student row
      | student      | courseTotal | grade | categoryTotal |
      | student_gb_1 | 48%         | 95%   | 48%           |
