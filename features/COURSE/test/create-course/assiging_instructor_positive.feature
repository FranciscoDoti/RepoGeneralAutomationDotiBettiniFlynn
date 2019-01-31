Feature: Assigning the course to the instructor 

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


        Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
        And I verify that the course's name "Read & Practice Template" is listed on the courses page
        
        And I click on "edit_course" on "Read & Practice Template" course menu
        And I fill out the form to edit a course
            | page_object      | value           |clear|
            | edit_course_name | Edit Testcourse |true |
            | edit_course_code | E2E 301         |true |
            | template_status  | Active On Date  |     |

        Then I verify the course_list data
            | page_object             | value           |
            | course_name             | Edit Testcourse |
            | course_name_course_code | E2E 301         |
            | course_name_isbn        | 9781464199498   |
        
        And I click on "course" system "create_course" feature "course_card" element 

        Then I verify "course" system "course_page" data
            | course_page             | 
            | overview                | 
            | course_planner          | 
            | resources               | 
    
        And I click on "course" system "course_page" feature "resources" element 

        Then I verify "course" system "resources_page" data
            | course_page      |
            | share_template   |
            | import_structure |
            | add_folder       |

        And I add Activities to course "isbn" "9781464199498"
            |activities                                  |
            |communicating courteously                   |
            |amongst                                     |
            |Active and Passive voice                    |
            |Evaluating, Integration and Acknowledgement |
            |Wars of Religion                            |   
            |Epilogues                                   |    
            |Aditya Kumar                                |
            |Sample Chapter 1                            |

        Then I verify "course" system "activity_list" data
            |activities                                  | clear |
            |communicating courteously                   | true  |
            |amongst                                     | true  |
            |Active and Passive voice                    | true  |
            |Evaluating, Integration and Acknowledgement | true  |
            |Wars of Religion                            | true  |
            |Epilogues                                   | true  |  
            |Aditya Kumar                                | true  |
            |Sample Chapter 1                            | true  |
        
        And I click on "course" system "resource" feature "Achieve_home" element 
        And I click on "copy_course" on "Read & Practice Template" course menu
        
        Then I verify "course" system "create_course" feature "success_message" element's "course_copied" message is displayed
        And I verify that a course "Copy of Read &practice Template" is listed on course page 