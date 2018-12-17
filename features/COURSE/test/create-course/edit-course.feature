Feature: Edit Course

  @delete-course
  Scenario: Verify that Media Producer is able to edit a created Qualitative
    Template
    Given I login to Achieve
    And I have logged in as "media_producer_2"
    And I click the Add course button

    When I fill out the form to edit a course
      | page_object        | value                   |
      | course_type        | Template                |
      | product_model      | Qualitative             |
      | learning_objective | Principles of Economics |
      | course_name        | Qualitative Testcourse  |
      | course_code        | E2E 301                 |
      | isbn_number        | 9781464199498           |
      | course_status      | draft                   |
    And I click on "edit_course" on "Qual Testcourse" course menu
    And I fill out the form to edit a course
      | page_object     | value           |
      | course_name     | Edit Testcourse |
      | course_code     | E2E 302         |
      | isbn_number     | 9781464199499   |
      | template_status | Active On Date  |

    Then I verify the updated information
