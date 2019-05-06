Feature: Overview Tab verification 
  
  Scenario: Verify that Admin is able to add activities and assign te activities over 7 days from now 

        Given I click login to the Achieve product
        And I have logged in as "admin_1"
        And I click on "course" system "create_course" feature "plus_button" element

        When I fill out the form to edit a new course
            | page_object        | value                        |
            | course_type        | Template                     |
            | product_model      | Quantitative                 |
            | learning_objective | Principles of Economics      |
            | course_name        | Quantitative Template TC     |
            | course_code        | E2E 303                      |
            | isbn_number        | 9039532434843                |
            | course_status      | draft                        |
        And I close the popup message
        And I click on "course" system "course_list" feature "search" element "Quantitative Template TC" input

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Quantitative Template Tc                                    |true |
            | edit_course_code | E2E 303                                                     |true |
            | template_status  | Active On Date                                              |     |

        And I close the popup message

        And I fill out the form to copy a course
            | page_object       | value                                 | clear |
            | copy_course       | Quantitative Template Testcourse      | true  |
            | copy_course_code  | E2E302                                | true  |
        And I close the popup message

        And I click on "course" system "course_list" feature "search" element "Quantitative Template Testcourse" input

        And I fill out the form to update the status of course to active
            | page_object      | value                                  | clear |
            | edit_course_name | Quantitattive Template Testcourse      | true  |
            | edit_course_code |  E2E303                                | true  |
            | template_status  |  Active On Date                        |       |
        And I close the popup message

        And I click on "course" system "create_course" feature "course_card" element   
        And I click on "course" system "course_page" feature "resources" element
        And I add the activity to the course under the resources tab
            | activity                                                          | type                      |
            | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
            | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |
            
        And I add the activities in courseplanner
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | Chapter 15. Monopolistic Competition and Product Differentiation  |       
        
 
       And  I assign the activities in courseplanner and add the afer 7 days 
            | activity                                                          | verify | Points | 
            | Exercise: Misused words 1 (autoscored)                            | true   | 5      |
            | Chapter 15. Monopolistic Competition and Product Differentiation  | true   | 5      |

        Then I verify that activities are not listed in overview Tab
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            | 
            | Chapter 15. Monopolistic Competition and Product Differentiation  |
