Feature: Create Template for skills

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

          Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
          And I verify that the course's name "Skills Template" is listed on the courses page