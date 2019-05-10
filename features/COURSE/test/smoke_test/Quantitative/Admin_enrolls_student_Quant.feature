Feature: Admin enrolls student in Quantitative course 

    @delete-all-courses
    Scenario: Verify that admin is able to enroll student in Quantitative course

        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

         When I fill out the form to edit a new course
            | page_object                   | value                                       |
            | course_type                   | Template                                    |
            | product_model                 | Quantitative                                |
            | course_name                   | Quantitative Template                       |
            | learning_objective            | macmillan calculus                          |
            | course_code                   | E2E 302                                     |
            | isbn_number                   | 9781464199411                               |
            | course_status                 | Draft                                       |

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Quantitative  Template                                      |true |
            | edit_course_code | E2E 302                                                     |true |
            | template_status  | Active On Date                                              |     |
        And I close the popup message

        Then I verify the course_list data
            | page_object             | value                 | 
            | course_name             | Quantitative Template |
            | course_name_course_code | E2E 302               | 
            | course_name_isbn        | 9781464199411         | 
        And I click on "course" system "create_course" feature "course_card" element 
        
        And I click on "course" system "course_page" feature "resources" element
        And I add the activity to the course under the resources tab
            | activity                                                          | type                      |
            |Exercise: Misused words 1 (autoscored)                             | add_button_assessment     |
            | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |
        
         And I click on "course" system "main" feature "achieve_home" element

         And I fill out the form to copy a course
            | page_object       | value                      | clear |
            | copy_course       | Quantitaive Testcourse Tc  | true  |
            | copy_course_code  | E2E302                     | true  |
        
        And I close the popup message
        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Quantitative Testcourse Tc" input 
        And I assign "instructor_1" to the course


        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        When I fill out the form to update the status of course to active 
        | page_object      | value                   | clear |
        | edit_course_name | Quantitative Testcourse | true  |
        | edit_course_code |  E2E301                 | true  |
        | template_status  |  Active On Date         |       |

        And I close the popup message
        And I "sign_out" of Achieve
        And I have logged in as "admin_1"
        
       And I click on "course" system "course_list" feature "search" element "Quantitative Testcourse" input 
       And I enroll the "student_6" in the course  
            | username                    |
            | macmillanstudent5@gmail.com |
        
        And I click on "course" system "home" feature "close_alert" element 

        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "student_6"

        Then I verify that the course's name "Quantitative Testcourse" is listed on the courses page

    
    
        
