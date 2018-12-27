Feature: Read and Practice happy path workflow student

   Scenario: Student enrolls in course, verify that Student is able to attempt different kinds of activities such of a Instructor created read and practice course created from Read & Practice template then verify the grades
        Given I check E-mail Notification of "student" for "courseware"

        When I have logged in as "student_2"
        And I click on "courseware" system "student_course" feature "grace_period" element
        And I click on "courseware" system "student_course" feature "finish_enrollenment" element 
        And I search for "E2E301" course
        And I click on "courseware" system "course_list" feature "course_name" element
        And I click on  "courseware" system "course_page" feature "course_planner" element 
        And I click on "courseware" system "course_planner" feature "read_and_paractice_activity" element
        And I click on "courseware" system "course_planner" feature "reading" element
        And I click on "courseware" system "course_planner" feature "Quiz" element
        
        Then I validate the grades are displayed in gradebook for "read and practice" activity

        And I search for "E2E301" course
        And I click on "courseware" system "course_list" feature "course_name" element
        And I click on  "courseware" system "course_page" feature "course_name" element 
        And I click on "courseware" system "course_planner" feature "learning_curve_activity" element
        And I click on "courseware" system "course_planner" feature "Quiz" element

        Then I validate the grades are displayed in gradebook for "learning curve" activity
        
        When I search for "E2E301" course
        And I click on "courseware" system "course_list" feature "course_name" element
        And I click on  "courseware" system "course_page" feature "course_planner" element 
        And I click on "courseware" system "course_planner" feature "reading_activity" element
        And I click on "courseware" system "course_planner" feature "reading" element
        
        Then I validate the grades are displayed in gradebook for "reading_activity" activity

        And I search for "E2E301" course
        And I click on "courseware" system "course_list" feature "course_name" element
        And I click on  "courseware" system "course_page" feature "course_planner" element 
        And I click on "courseware" system "course_planner" feature "file_activiy" element
        
        Then I validate the grades are displayed in gradebook for "file_activity" activity
 