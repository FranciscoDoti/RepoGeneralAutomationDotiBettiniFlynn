Feature: Create Course

        @delete-course
        Scenario: Verify that a Media Producer is able to create a Read & Practice Course
          Given I login to Achieve
          And I have logged in as "media_producer_2"
          And I click on "course" system "create_course" feature "button" element

          When I fill out the form to edit a course
            | page_object   | value                  |
            | course_type   | Course                 |
            | product_model | Read & Practice        |
            | course_name   | Read & Practice Course |
            | course_code   | E2E 301                |
            | course_status | draft                  |

          Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
          And I verify that the course's name "Read & Practice Course" is listed on the courses page
