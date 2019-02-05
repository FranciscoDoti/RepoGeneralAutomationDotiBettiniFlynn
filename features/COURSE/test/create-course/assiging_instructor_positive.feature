Feature: Assigning the course to the instructor 

    # @delete-course
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
            | activity                                                          | type               |
            | communicating courteously                                         | Reading            |
            | amongst                                                           | Reading            |
            | Active and Passive voice                                          | learning_curve     |
            | Evaluating, Integration and Acknowledgement                       | learning_curve     |
            | Wars of Religion                                                  | Read and Practice  |
            | Epilogues                                                         | Read and Practice  |
                
        Then I verify the activity list 
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
        And I click on "course" system "course_list" feature "search_for_course_name" element "Edit TestcourseRead & Practice course" input 
        And I click on "Manage_instructor" element to add instructor 
        And I click on "course" system "create_course" feature "add_instructor" element "macmillaninstructor3@gmail.com" email
        And I click on "course" system "create_course" feature "add_instructor_button" element 
        And I click on "course" system "create_course" feature "add_instructor_close" element 

        And I "sign_out" of Achieve
        And I click on "course" system "home" feature "sign_in" element 
        When I login with the following credentials
        | username                                   | password       |
        | macmillaninstructor3@gmail.com             |  ABCabc@123    | 
    
    Then I verify that the course's name "COPY OF Edit TestcourseRead & Practice course" is listed on the courses page