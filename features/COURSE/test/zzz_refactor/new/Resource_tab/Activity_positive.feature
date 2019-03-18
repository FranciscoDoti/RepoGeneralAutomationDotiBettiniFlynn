Feature: Adding_activities in resource tab 

    @delete-course
    Scenario: Verify that a Media Producer is able to create a Read & Practice Course
        Given I login to Achieve
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the course form
            | page_object   | value                    |
            | course_type   | Template                 |
            | product_model | Read & Practice          |
            | course_name   | Read & Practice Template |
            | course_code   | E2E 301                  |
            | isbn_number   | 9781464199498            |
            | course_status | draft                    |
        
        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Edit Testcourse                                             |true |
            | edit_course_code | E2E 301                                                     |true |
            | ebook_link       | https://int-achieve-courseware-frontend.mldev.cloud/courses |true |
            | template_status  | Active On Date                                              |     |
        
        And I click on "course" system "create_course" feature "course_card" element 

    
        And I click on "course" system "course_page" feature "resources" element 

        
        And I add the activity to the course under the resources tab
            | activity                                                          | type                        |
            | communicating courteously                                         | add_reading_button          |                                                        
            | Active and Passive voice                                          | add_button_learningcurve    |
            | Wars of Religion                                                  | add_button_readandpractice  |

        Then I verify the activity list 
            | activity                     | 
            | communicating courteously    |                                                        
            | Active and Passive voice     |
            | Wars of Religion             | 
 
        

       