Feature: Changing the status of activities from unassigned to assigned 

    @delete-course
    Scenario: Verify that a Media Producer is able to create a Read & Practice Course
        Given I login to Achieve
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a course
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
            | activity                                                          | type                          |
            | communicating courteously                                         | add_reading_button            |                                                        
            | Active and Passive voice                                          | add_button_learningcurve      |
            | Wars of Religion                                                  | add_button_readandpractice    |


        And I fill out the form to copy a course
            | page_object       | value                    |
            | copy_course       | Read & Practice course   |
            | copy_course_code  | E2E301                   |

        And I "sign_out" of Achieve
        And I have logged in as "customer_support_1"

        And I click on "course" system "course_list" feature "search_for_course_name" element "Edit TestcourseRead & Practice course" input 
        And I assign Instructor to the course
            | username              | password   |
            | bawi@quick-mail.info  | ABCabc@123 |

        And I "sign_out" of Achieve
        And I have logged in as "instructor_7"
       

        When I fill out the form to update the status of course to active 
            | page_object      | value                | clear |
            |  course_name     |  Read& Practice      | True  |  
            |  course_code     |   E2E301             | True  |  
            | template_status  |  Active On Date      | True  |

        And I invite the students
            | username                    |
            | macmillanstudent4@gmail.com | 
        
        And I add the activities in courseplanner 
            | activity                                                          | type               |
            | communicating courteously                                         | Reading            |                                                        
            | Active and Passive voice                                          | learning_curve     |
            | Wars of Religion                                                  | Read and Practice  |
        
        And I update the activity status from assigned to unassigned 
            | activity                                                          | type               |
            | communicating courteously                                         | Reading            |                                                        
            | Active and Passive voice                                          | learning_curve     |
            | Wars of Religion                                                  | Read and Practice  |
        
        Then I verify "activity_staus" as open

        
    
        


