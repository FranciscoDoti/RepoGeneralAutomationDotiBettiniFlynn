  Feature: Verifying the following Tabs are present in Instructor 
  
    @delete-all-courses
    Scenario: Verifying the following Tabs are present in Instructor Qual Template
        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object                   | value                                       |
            | course_type                   | Template                                    |
            | product_model                 | Qualitative                                 |
            | learning_objective            | Principles of Microeconomics                |
            | course_name                   | Qualitative Testcourse                      |
            | learning_objective            | macmillan calculus                          |
            | course_code                   | E2E 302                                     |
            | isbn_number                   | 9036787554123                               |
            | course_status                 | Draft                                       |
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Qualitative Testcourse                                      |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |
        And I close the popup message
    
        And I fill out the form to copy a course
            | page_object       | value                         | clear |
            | copy_course       | Qualitative Testcourse test   | true  |
            | copy_course_code  | E2E302                        | true  |
        
        And I close the popup message
        
        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Qualitative Testcourse test" input 
        And I assign "instructor_1" to the course

        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"
    
        Then I verify that the course's name "Qualitative Testcourse" is listed on the courses page

       
        And I click on "course" system "create_course" feature "course_card" element 

        Then I verify the data in course page 
            | course_page            | clear |
            | overview               | true  |
            | course_planner         | true  |
            | gradebook              | true  |
            | reports                | true  |
    
          
