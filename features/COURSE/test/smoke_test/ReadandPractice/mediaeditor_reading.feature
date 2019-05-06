Feature: Create Template for Read and Practice

  Scenario: Verify that a Media Editor is able to create a Read & Practice Course
    Given I click login to the Achieve product
    And I have logged in as "media_editor_1"
    And I click on "course" system "create_course" feature "plus_button" element

    When I fill out the form to edit a new course
            | page_object   | value                  |
            | course_type   | Course                 |
            | product_model | Read & Practice        |
            | course_name   | Read & Practice Course |
            | course_code   | E2E 301                |
            | isbn_number   | 9781464191089          |
            | course_status | Draft                  |

    Then I verify "course" system "create_course" feature "success_message" element's "create_course_reading_success" message is displayed
    And I click on "course" system "course_list" feature "search" element "Read & Practice Course" input
    And I verify that the course's name "Read & Practice Course" is listed on the courses page
