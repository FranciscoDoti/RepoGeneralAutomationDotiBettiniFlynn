 Feature: Adding Activities

    @delete-all-courses
    Scenario: Verify that Media Producer is able to add activities in Read and Practice Template 
        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object   | value                    |
            | course_type   | Template                 |
            | product_model | Read & Practice          |
            | course_name   | Read & Practice Template |
            | course_code   | E2E 301                  |
            | isbn_number   | 9781464199496            |
            | course_status | draft                    |
        
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Read & Practice Template                                    |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |
        And I close the popup message

        Then I verify the course_list data
            | page_object             | value                    |
            | course_name             | Read & Practice Template |
            | course_name_course_code | E2E 301                  |
            | course_name_isbn        | 9781464199496            |

        And I close the popup message
        
        And I click on "course" system "create_course" feature "course_card" element 
    
        And I click on "course" system "course_page" feature "resources" element   
        And I add the activity to the course under the resources tab
            | activity                                                          | type                        |
            | communicating courteously                                         | add_reading_button          |                                                        
            | LC1551301608988                                                   | add_button_learningcurve    |
            | LCRP1550612138614                                                 | add_button_readandpractice  |

        And I verify the activity list in resource tab
            | activity                                                                       |  
            | Communicating courteously and profession ...                                   |                                                        
            | LCRP1551301608988                                                              |
            | LC1551301608988                                                                | 
 
