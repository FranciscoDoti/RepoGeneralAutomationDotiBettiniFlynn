Feature: Creating Custom made activities

    @delete-all-courses
    Scenario: Verify that instructor is able to add a custom created assessment activity in a Instructor created course from Quantitative Template
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
            | isbn_number                   | 9036787554123                               |
            | course_status                 | Draft                                       |
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Quantitative Template                                       |true |
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
            | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
            | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |
    
        And I click on "course" system "main" feature "achieve_home" element
        And I fill out the form to copy a course
            | page_object       | value                    | clear |
            | copy_course       | Quantitative test course | true  |
            | copy_course_code  | E2E302                   | true  |

            
        And I close the popup message
        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Quantitative test course" input 
        And I assign "instructor_1" to the course
        
        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        And I click on "course" system "create_course" feature "course_card" element
        When I create custom made activity
            | activity           | value                                      |
            | Assignment_tittle  | Quant Test                                 |
            | Assignment_type    | Test                                       |
            | taxonomy           | Interactive General Chemistry V1           |

        And I add the activities in courseplanner
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | Chapter 15. Monopolistic Competition and Product Differentiation  |
        
        And I add custom made activities in courseplanner
            | activity                            |
            | Quant Test                          |

        
        Then I verify activity list 
            | activity                                                         | 
            | BR15: Bridge: Monopolistic Competition                           |
            | Chapter 15. Monopolistic Competition and Product Differentiation |
            | Quant Test                                                       |

    
 

        
       