Feature: Adding activities and checking the activities are redirected to their respective pages 
   
    @delete-course
    Scenario: Verify that a Media Producer is able to create a Read & Practice Course
        Given I login to Achieve
        And I login with the following credentials
        | username                                   | password         |
        | mediaproducer@rupayamail.com               |  ABCabc@123       |
        
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a course
            | page_object   | value                    |
            | course_type   | Template                 |
            | product_model | Read & Practice          |
            | course_name   | Read & Practice Template |
            | course_code   | E2E 301                  |
            | isbn_number   | 9781464199498            |
            | course_status | draft                    |


        Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
        And I verify that the course's name "Read & Practice Template" is listed on the courses page
        
        And I click on "edit_course" on "Read & Practice Template" course menu
        And I fill out the form to edit a course
            | page_object      | value                                                       |clear|
            | edit_course_name | Edit Testcourse                                             |true |
            | edit_course_code | E2E 301                                                     |true |
            | ebook_link       | https://int-achieve-courseware-frontend.mldev.cloud/courses |true |
            | template_status  | Active On Date                                              |     |

        Then I verify "course" system "create_course" feature "success_message" element's "edit_course_sucess" message is displayed
        And I click on "edit_course" on "Read & Practice Template" course menu
        And I verify the course_list data
            | page_object             | value           |
            | course_name             | Edit Testcourse |
            | course_name_course_code | E2E 301         |
            | course_name_isbn        | 9781464199498   |
        
        And I click on "course" system "create_course" feature "course_card" element 

        Then I verify the data in course page 
            | course_page            | clear |
            | overview               | true  |
            | course_planner         | true  |
          
    
        And I click on "course" system "course_page" feature "resources" element 

        Then I verify the data in resource page
            | course_page      |
            | share_template   |
            | import_structure |
            | add_folder       |

        
        And I add the activity to the course under the resources tab
            | activity                                                          | type                          |
            | communicating courteously                                         | add_reading_button            |                                                        
            | Active and Passive voice                                          | add_button_learningcurve      |
            | Wars of Religion                                                  | add_button_readandpractice    |

        Then I verify activity list 
            |  activity                    | 
            | communicating courteously    |                                                        
            | Active and Passive voice     |
            | Wars of Religion             | 

        
        And I click on "course" system "main" feature "Achieve_home" element 
        And I click on "copy_course" on "Read & Practice Template" course menu
        And I fill out the form to edit a course
            | page_object       | value                    |
            | copy_course       | Read & Practice course   |
            | copy_course_code  | E2E301                   |

        Then I verify "course" system "create_course" feature "success_message" element's "course_copied" message is displayed

        And I "sign_out" of Achieve
        And I click on "course" system "home" feature "sign_in" element 

        And I login with the following credentials
        |  username                                   | password       |
        |  coustomer.macmillan@gmail.com              |  ABCabc@123    | 
        And I click on "course" system "course_list" feature "search_for_course_name" element "Read & Practice course" input 
        And I click on "Manage_instructor" element to add
        And I assign Instructor to the course
            | username              | password   |
            | suge@quick-mail.info  | ABCabc@123 |

        And I "sign_out" of Achieve
        And I click on "course" system "home" feature "sign_in" element 
        When I login with the following credentials
        | username                                   | password       |
        | suge@quick-mail.info                       |  ABCabc@123    | 

        Then I verify that the course's name "COPY OF Edit TestcourseRead & Practice course" is listed on the courses page

        And I click on "edit_course" on "Read & Practice Template" course menu
        And I click on "course" system "create_course" feature "template_status" element input "Active On Date" and enter date

        Then I verify "course" system "create_course" feature "success_message" element's "course_activation" message is displayed
        And I verify that the course "COPY OF Edit TestcourseRead & Practice course" is "course_activation"

        When I click on "invite_students_button" element to add
        And I invite the students
            | username                    |
            | macmillanstudent4@gmail.com | 

        Then I verify "course" system "create_course" feature "success_message" element's "email_notification" message is displayed 

        And I add the activities in courseplanner 
            | activity                                                          | type               |
            | communicating courteously                                         | Reading            |                                                        
            | Active and Passive voice                                          | learning_curve     |
            | Wars of Religion                                                  | Read and Practice  |
        
        Then I verify activity list 
            |  activity                    | 
            | communicating courteously    |                                                        
            | Active and Passive voice     |
            | Wars of Religion             | 
        
       

        
        

       
    
