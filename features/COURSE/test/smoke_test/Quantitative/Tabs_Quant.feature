Feature: Tabs verification
    @delete-all-courses
    Scenario: Verify that Following tabs are updating appropriately on Instructor End for Quantitative Courses      

        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object                   | value                                       |
            | course_type                   | Template                                    |
            | product_model                 | Quantitative                                |
            | course_name                   | Quantitative Testcourse                     |
            | learning_objective            | macmillan calculus                          |
            | course_code                   | E2E 302                                     |
            | isbn_number                   | 9036787553223                               |
            | course_status                 | Draft                                       |
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Quantitative Template                                       |true |
            | edit_course_code | E2E 302                                                     |true |
            | template_status  | Active On Date                                              |     |
        And I close the popup message
    
        And I fill out the form to copy a course
            | page_object       | value                    | clear |
            | copy_course       | Quantitative Testcourse  | true  |
            | copy_course_code  | E2E302                   | true  |
       
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Quantitative Testcourse" input 
        And I assign "instructor_1" to the course

        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"
    
        Then I verify that the course's name "Quantitative Testcourse" is listed on the courses page

        And I click on "course" system "create_course" feature "course_card" element 

        Then I verify the data in course page 
            | course_page            | clear |
            | overview               | true  |
            | course_planner         | true  |
            | gradebook              | true  |
            | reports                | true  |

    

