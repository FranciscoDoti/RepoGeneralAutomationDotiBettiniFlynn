Feature: Admin enrolls student in writer's help course

    @delete-all-courses
    Scenario: Verify that admin enrolls student in writers help course

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
        And I have logged in as "admin_1"
        
       And I click on "course" system "course_list" feature "search" element "Skills Writer's Help 3.0" input 
       And I enroll the "student_6" in the course  
            | username                    |
            | macmillanstudent5@gmail.com |
        
        And I click on "course" system "home" feature "close_alert" element 

        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "student_6"

        Then I verify that the course's name "Skills testcourse" is listed on the courses page
