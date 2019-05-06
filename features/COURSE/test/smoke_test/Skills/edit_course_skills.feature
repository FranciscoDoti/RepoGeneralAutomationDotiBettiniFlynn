Feature: Updating Draft To Template

    @delete-all-courses
    Scenario: Verify that a Media Producer is able to create a Read & Practice Course
        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object   | value                  |
            | course_type   | Template               |
            | product_model | Skills                 |
            | course_name   | Skills Template        |
            | course_code   | E2E 401                |
            | isbn_number   | 9781464199411          |
            | course_status | draft                  |

        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Skills Template                                             |true |
            | edit_course_code | E2E 401                                                     |true |
            | template_status  | Active On Date                                              |     |


        Then I verify "course" system "create_course" feature "success_message" element's "edit_course_message_skills" message is displayed
        And I verify the course_list data
            | page_object             | value           |
            | course_name             | Skills Template |
            | course_name_course_code | E2E 401         |
            | course_name_isbn        | 9781464199411   |