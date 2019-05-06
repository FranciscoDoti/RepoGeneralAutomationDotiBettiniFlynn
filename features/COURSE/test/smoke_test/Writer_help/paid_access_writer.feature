Feature: Paid access code creater is able to generate paid access code

@delete-all-courses
Scenario: Verify that paid access code creator is able to generate access codes for Writer's help Template

        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object   | value                           |
            | course_type   | Template                        |
            | product_model | Skills                          |
            | course_name   | Testcourse Writer's Help 3.0    |
            | course_code   | Test                            |
            | isbn_number   | 5015578884056                   |
            | course_status | Active On Date                  |
        And I close the popup message

        And I fill out the form to copy a course
            | page_object       | value                      | clear |
            | copy_course       | Skills Writer's Help 3.0   | true  |
            | copy_course_code  | Test                       | true  |
      
        And I close the popup message

        And I "sign_out" of Achieve
        Given I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Skills Writer's Help 3.0" input 
        And I assign "instructor_1" to the course
           

        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"
        When I fill out the form to update the status of course to active 
            | page_object      | value                      | clear |
            | edit_course_name |  Skills Writer's Help 3.0  | true  |
            | edit_course_code |  Test                      | true  |
            | template_status  |  Active On Date            |       |
        
        And I close the popup message
        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "paid_access"

        And I click on "course" system "course_list" feature "search" element "Skills testcourse" input

        When I generate access code
            | page_object       | value |
            | single_use_code   |    1  |
            | length_access     |    1  |


        