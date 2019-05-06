Feature: Instructor assign the activities

    @delete-all-courses
    Scenario: Verify that Instructor is able to assign activities in Qualitative Template 

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
            | isbn_number        | 9781464199411           |true |
            | course_status      | draft                   |     |
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Qualitative Testcourse                                      |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |
     
        Then I verify the course_list data
            | page_object             | value                   | 
            | course_name             | Qualitative Testcourse  | 
            | course_name_course_code | E2E 301                 |
            | course_name_isbn        |  9781464199411          |
        And I close the popup message 

        And I click on "course" system "create_course" feature "course_card" element  
        And I click on "course" system "course_page" feature "resources" element
        And I add the activity to the course under the resources tab
            | activity                                                          | type                      |
            |  Exercise: Misused words 1 (autoscored)                           | add_button_assessment     |
            | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |

        And I click on "course" system "main" feature "achieve_home" element 
        And I fill out the form to copy a course
            | page_object       | value                    |clear|
            | copy_course       | Qualitative course       |true |
            | copy_course_code  | E2E301                   |true |

        And I close the popup message

        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Qualitative course" input 
        And I assign "instructor_1" to the course
    
        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        When I fill out the form to update the status of course to active 
            | page_object      | value                   | clear |
            | edit_course_name | Qualitative Testcourse  | true  |
            | edit_course_code |  E2E301                 | true  |
            | template_status  |  Active On Date         |       |
    
        And I close the popup message
        And I click on "course" system "create_course" feature "course_card" element
        When I create custom made activity
            | activity           | value                                    |
            | Assignment_tittle  | Qual Test                                |
            | Assignment_type    | Test                                     |
            | taxonomy           | Interactive General Chemistry V1         |
        
        And I add the activities in courseplanner
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | Chapter 15. Monopolistic Competition and Product Differentiation  |
        
        And I add custom made activities in courseplanner
            | activity                           |
            | Qual Test                          |

        And I click on "course" system "course_page" feature "course_planner" element

        And I assign the activities in courseplanner
            | activity                                                          | verify | Points | 
            | Qual Test                                                         | true   | 5      |
            | Exercise: Misused words 1 (autoscored)                            | true   | 5      | 
            | Chapter 15. Monopolistic Competition and Product Differentiation  | true   | 5      | 
 
 
        Then I verify the status of activities 
            | activity                                                          | verify |
            | Qual Test                                                         | Open   |
            | Exercise: Misused words 1 (autoscored)                            | Open   |
            | Chapter 15. Monopolistic Competition and ...                      | Open   |
        
