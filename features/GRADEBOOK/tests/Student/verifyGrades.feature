@Gradebook @Smoke @GradebookVerifyGrades
Feature: Verify grade and exception accuracy
  Grades always appear correct under different exceptions and assignment configurations
  These tests rely on there being a course in the Courses tab called "E2E GBK Student Grades Template"
  The course should have the following url assignments available in the Course Plan tab
  Yahoo - https://yahoo.com/
  Wikipedia - https://www.wikipedia.org/
  Google - https://www.google.com/
  Bing - https://www.bing.com/

  Background:
    Given I login to Achieve-CW as "admin_1"
    When I activate course "E2E GBK Student Grades Template" with the following data
      | courseName                    | courseCode |
      | E2E GBK Student Grades Course | E2E 301    |
    And I assign "instructor_gb" to my course
    And I enroll the following students in my course
      | student      |
      | student_gb_1 |
      | student_gb_2 |
      | student_gb_3 |
      | student_gb_4 |
    And I create a Gradebook Category with dropped lowest grade policy
      | categoryName      | dropGrade |
      | Drop Lowest Grade | 1         |
    Then I sign out of Achieve

  @admin-delete-course
  Scenario: Verify that Instructor is able to assign the activities and grades are correct under all assignment types
    Given I login to Achieve-CW as "instructor_gb"
    And I assign students to activities in courseplanner
      | activity  | points | student      | category          | isPastDue | exceptionStudent |
      | Wikipedia | 10     | Everyone     | Assignment        | true      | student_gb_1     |
      | Bing      | 10     | Everyone     | Drop Lowest Grade | true      |                  |
      | Yahoo     | 10     | Everyone     | Drop Lowest Grade | false     |                  |
      | Google    | 10     | student_gb_4 | Drop Lowest Grade | true      |                  |
    Then I verify that activities are assigned
      | activity  | Status |
      | Wikipedia | Closed |
      | Bing      | Closed |
      | Google    | Closed |
      | Yahoo     | Open   |

    When I edit students grades
      | student      | grade | row | column | feedback      |
      | student_gb_4 | 9     | 1   | 1      | test feedback |
      | student_gb_4 | 8     | 1   | 2      | test feedback |
      | student_gb_4 | 7     | 1   | 3      | test feedback |
    Then I verify grade override modal has correct data
      | student      | originalGrade    | row | column | feedback      |
      | student_gb_4 | 7.00/10.00 pts.  | 1   | 3      | test feedback |
    Then I verify the grades for students
      | student      | row | column | grade      |
      | student_gb_4 | 1   | 1      | 90%        |
      | student_gb_1 | 1   | 2      | 80%Dropped |
      | student_gb_4 | 1   | 3      | 70%        |
      | student_gb_4 | 1   | 5      | 0%         |
      | student_gb_1 | 2   | 1      | -          |
      | student_gb_1 | 2   | 2      | 0%         |
      | student_gb_1 | 2   | 3      | --         |
      | student_gb_1 | 2   | 5      | --         |
    Then I verify the category total
      | row | column | categoryTotal |
      | 1   | 4      | 80%           |
    Then I verify the course total
      | student      | courseTotal |
      | student_gb_4 | 53%         |

    Given I update category "Drop Lowest Grade" to drop "0" grades
    And I verify the grade "80%" is not droped for row "1" and column "2"
    Then I sign out of Achieve

    Given I login to Achieve-CW as "student_gb_1"
    And I click on "E2E GBK Student Grades Course"
    And I attempt "Wikipedia" URL activity
    Then I verify the activity status for the following activities in "ASSIGNMENTS"
      | activity  | status   |
      | Wikipedia | Complete |

    When I click on "Gradebook" Tab
    And I confirm assigned assignment "Wikipedia" is in my gradebook
    And I confirm unassigned assignment "Google" is not in my gradebook
    Then I sign out of Achieve

    Given I login to Achieve-CW as "instructor_gb"
    And I click on "E2E GBK Student Grades Course" card
    And I click on "Gradebook" Tab
    Then I verify the grades for students
      | student      | row | column | grade |
      | student_gb_1 | 2   | 5      | 100%  |
