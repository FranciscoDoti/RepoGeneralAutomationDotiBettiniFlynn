Feature: Creating Paid_access for Qualitative

   @delete-all-courses
    Scenario: Verify that paid access code creator is able to generate access codes for Qualitative Template

        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object        | value                   |clear|
            | course_type        | Template                |     |
            | product_model      | Qualitative             |     |
            | learning_objective | Principles of Economics |     |
            | course_name        | Qualitative Testcourse  |true |
            | course_code        | E2E 301                 |true |
            | isbn_number        | 9781464199497           |true |
            | course_status      | draft                   |     |
            
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Qualitative Testcourse                                      |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |
     
        Then I verify the course_list data
            | page_object             | value                      | 
            | course_name             | Qualitative Testcourse     | 
            | course_name_course_code | E2E 301                    |
            | course_name_isbn        |  9781464199497             |
        
        And I close the popup message
 
        And I fill out the form to copy a course
            | page_object       | value                         |clear|
            | copy_course       | Qualitative Testcourse test   |true |
            | copy_course_code  | E2E301                        |true |

        And I close the popup message

        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Qualitative Testcourse test" input 
        And I assign "instructor_1" to the course
        
        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        When I fill out the form to update the status of course to active 
            | page_object      | value                        | clear |
            | edit_course_name | Qualitative Testcourse Test  | true  |
            | edit_course_code |  E2E301                      | true  |
            | template_status  |  Active On Date              |       |
    
        And I close the popup message

        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "paid_access"

        And I click on "course" system "course_list" feature "search" element "Qualitative Testcourse" input

        When I generate access code
            | page_object       | value |
            | single_use_code   |    1  |
            | length_access     |    1  |



