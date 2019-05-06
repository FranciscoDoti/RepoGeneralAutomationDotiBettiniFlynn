Feature: Customer support is able to add instructor in writer's help course   
    @delete-all-courses
    Scenario:Verify that Customer Support is able to add instrucor to the course copied from Writers Template 
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
        
        And I close the popup message
        
        And  I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Skills  Writer's Help 3.0" input 
        And I assign "instructor_1" to the course

        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"
       
        Then I verify that the course's name "Skills  Writer's Help 3.0" is listed on the courses page
        


