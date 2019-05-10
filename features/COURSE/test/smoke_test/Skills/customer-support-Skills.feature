Feature: Customer support is able to add instructor to Skills course

    @delete-all-courses
    Scenario:Verify that Customer Support is able to add instrucor to the course copied from Skills Template 

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
        
        And I close the popup message

        And I fill out the form to copy a course
            | page_object       | value                    | clear |
            | copy_course       | Skills                   | true  |
            | copy_course_code  | E2E301                   | true  |
        
        And I close the popup message
        And I "sign_out" of Achieve
    
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Skills Template" input 
        And I assign "instructor_1" to the course
          
        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"
       
        Then I verify that the course's name "Skills Template" is listed on the courses page