Feature: Medai Editor Create Template for skills

  Scenario: Verify that a Media editor is able to create a Read & Practice Course
    
    Given I click login to the Achieve product
    And I have logged in as "media_editor_1"
    And I click on "course" system "create_course" feature "plus_button" element

    When I fill out the form to edit a new course
      | page_object   | value                  |
      | course_type   | Template               |
      | product_model | Skills                 |
      | course_name   | Skills Template TC     |
      | course_code   | E2E 401                |
      | isbn_number   | 9781464195461          |
      | course_status | draft                  |

    Then I verify "course" system "create_course" feature "success_message" element's "create_course_skills_success" message is displayed
    And I click on "course" system "course_list" feature "search" element "Skills Template TC" input
    And I verify that the course's name "Skills Template" is listed on the courses page

