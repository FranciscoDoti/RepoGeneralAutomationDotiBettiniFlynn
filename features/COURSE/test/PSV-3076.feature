Feature: Admin adding activities from activity search 
  
  Scenario: Verify that Admin is able to add activities from Activity search to the Resources tab of a course

        Given I click login to the Achieve product
        And I have logged in as "admin_1"
        And I click on "course" system "create_course" feature "plus_button" element

        When I fill out the form to edit a new course
            | page_object        | value                        |
            | course_type        | Template                     |
            | product_model      | Qualitative                  |
            | learning_objective | Principles of Economics      |
            | course_name        | Qualitative Template TC      |
            | course_code        | E2E 302                      |
            | isbn_number        | 9039532434885                |
            | course_status      | draft                        |
        And I close the popup message
        And I click on "course" system "course_list" feature "search" element "Qualitative Template TC" input

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Qualitative Template Tc                                     |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |

        And I close the popup message
        And I click on "course" system "course_list" feature "search" element "Qualitative Template TC" input

        And I click on "course" system "create_course" feature "course_card" element   
        And I click on "course" system "course_page" feature "resources" element
        And I add the activity to the course under the resources tab
            | activity                                                          | type                      |
            | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
            | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |
    
        Then I verify the activity list in resource tab 
            | activity                                                            | 
            | Exercise: Misused words 1 (autoscored)                              |
            | Chapter 15. Monopolistic Competition and ...                        |

         
    

  