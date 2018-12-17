Feature: Create Qualitative Course
  Media Producer creates a course

  Background:
    Given I have opened "achieve" "login"
    And I click on "iam" system "home" feature "sign_in" element

  @delete-course
  Scenario: Verify that Media Producer is able to create Quant Template
    Given I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to create a new course
      | page_object        | value                   |
      | course_type        | Template                |
      | product_model      | Qualitative             |
      | learning_objective | Principles of Economics |
      | course_name        | Qual Testcourse         |
      | course_code        | E2E 301                 |
      | isbn_number        | 9781464199498           |
      | course_status      | draft                   |

    Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
    Then I validate that the course "isbn" "9781464199498" is listed on the courses page
