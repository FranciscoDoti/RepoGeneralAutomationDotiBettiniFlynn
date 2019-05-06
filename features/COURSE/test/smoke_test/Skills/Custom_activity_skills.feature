Feature: Creating custom activity in skill 

    @delete-all-courses
    Scenario: Verify that instructor is able to add a custom created assessment activity in a Instructor created course from Quantitative Template

        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object   | value                  |
            | course_type   | Template               |
            | product_model | Skills                 |
            | course_name   | Skills Template        |
            | course_code   | E2E 401                |
            | isbn_number   | 9781464199411          |
            | course_status | draft                  |

        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Skills Template                                             |true |
            | edit_course_code | E2E 401                                                     |true |
            | template_status  | Active On Date                                              |     |
        And I close the popup message
        And I click on "course" system "create_course" feature "course_card" element 
    
        And I click on "course" system "course_page" feature "resources" element 


        And I add the activity to the course under the resources tab
            | activity                                                          | type                        |
            |Exercise: Misused words 1 (autoscored)                                         | add_button_assessment       |                                                                                              
            | LC1551301608988                                          | add_button_learningcurve    |
            | Complete the Study Plan for Reading Strategies - English v2       | add_pathfinder_button       |
            | Final Test for Reading Skills - Hacker                            | add_pathfinder_button       |
 
        And I click on "course" system "main" feature "achieve_home" element
        And I fill out the form to copy a course
            | page_object       | value                    | clear |
            | copy_course       | Skills Testcourse        | true  |
            | copy_course_code  | E2E301                   | true  |
        
        And I close the popup message

        And I "sign_out" of Achieve
        Given I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Edit TestcourseSkills" input 
        And I assign "instructor_1" to the course


        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        And I click on "course" system "create_course" feature "course_card" element

        When I create custom made activity
            | activity           | value                                      |
            | Assignment_tittle  | Skills Test                                |
            | Assignment_type    | Test                                       |
            | taxonomy           | Interactive General Chemistry V1           |

        And I add the activities in courseplanner
            | activity                                                          | 
            |Exercise: Misused words 1 (autoscored)                             |                                                                                              
            | LC1551301608988                                                   | 
            | Complete the Study Plan for Reading Strategies - English v2       | 
            | Final Test for Reading Skills - Hacker                            | 
 
        And I add custom made activities in courseplanner
            | activity                             |
            | Skills Test                          |

        
        Then I verify activity list 
            | activity                                                          | 
            | Skills Test                                                       |
            | Exercise: Misused words 1 (autoscored)                            |                                                                                              
            | LC1551301608988                                                   | 
            | Complete the Study Plan for Reading Stra ...                      | 
            | Final Test for Reading Skills - Hacker                            |
                                