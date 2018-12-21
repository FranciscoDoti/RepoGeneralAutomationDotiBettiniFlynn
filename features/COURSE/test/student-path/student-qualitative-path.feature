Feature: R&P happy path workflow student

    Scenario: Student enrolls in course
        Given I check E-mail Notification of "student" for "courseware"

        When I have logged in as "student_2"
        And I check E-mail Notification of "student" for "courseware"
        And I click on "courseware" system "student_course" feature "grace_period" element
        And I click on "courseware" system "student_course" feature "finish_enrollenment" element        
        
        
        Then I validate that the following information is correct on the Course Access Code page
        | element           | value         |
        | element_example   | value_example |

    Scenario: Verify that Student is able to attempt activities of a Instructor created pre-made assesment course created from Quantitative template 

        Given I have opened "courseware" "login"

        When I search for "(.*)" course
        And I click on "courseware" system "course_list" feature "course_name" element
        And I click on  "courseware" system "course_page" feature "course_name" element 
        And I input "premade assesment 1" into "courseware" system "resources" feature "last_name" element
        And I click on  "courseware" system "resources" feature "first_activity" element
        And I answer the questions in the "premade" assesment activity
        
        Then I validate the marks are displayed in gradebook for "premade assesment" activity

    
    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor custom made assesment course created from Quantitative Template
        Given I have opened "courseware" "login"
        
        When I have logged in as "student_2"
        And I search for "(.*)" course
        And I click on "courseware" system "course_list" feature "course_name" element
        And I click on  "courseware" system "course_page" feature "course_name" element 
        And I input "custom assesment 1" into "courseware" system "resources" feature "last_name" element        
        And I click on  "courseware" system "resources" feature "first_activity" element
        And I answer the questions in the "custom" assesment activity
        
        Then I validate the marks are displayed in gradebook for "custom assesment" activity
 


    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor that were created from Quantitative Template
        Given I have opened "courseware" "login"
        
        When I have logged in as "student_2"
        And I search for "(.*)" course
        And I click on "courseware" system "course_list" feature "course_name" element
        And I click on  "courseware" system "course_page" feature "course_name" element 
        And I input "qualitative assesment 1" into "courseware" system "resources" feature "last_name" element        
        And I click on  "courseware" system "resources" feature "first_activity" element
        And I answer the questions in the "qualitative" assesment activity
        
        Then I validate the marks are displayed in gradebook for "custom assesment" activity
 



   
   

    