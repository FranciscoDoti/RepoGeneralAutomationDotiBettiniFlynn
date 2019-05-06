Feature: Admin is able to copy course from Writer's Help Template 

    @delete-all-courses
    Scenario: Verify that Admin is able to copy course from Writer's Help Template 

        Given I click login to the Achieve product
        And I have logged in as "admin_1"
        And I click on "course" system "create_course" feature "plus_button" element

        When I fill out the form to edit a new course
            | page_object   | value                           |
            | course_type   | Template                        |
            | product_model | Skills                          |
            | course_name   | Testcourse Writer's Help 3.0    |
            | course_code   | Test                            |
            | isbn_number   | 5015578884056                   |
            | course_status | Active On Date                  |

        And I close the popup message 
        
        And I click on "course" system "course_list" feature "search" element "Testcourse Writer's Help 3.0" input 
        And I fill out the form to copy a course
            | page_object       | value                      | clear |
            | copy_course       | Skills  Writer's Help 3.0  | true  |
            | copy_course_code  | E2E301                     | true  |
            

        Then I verify "course" system "create_course" feature "success_message" element's "course_copied" message is displayed
      


