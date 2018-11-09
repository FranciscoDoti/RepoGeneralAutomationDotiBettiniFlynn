Feature: Qual happy path workflow 

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
    
    Scenario: Verify that Media Producer is able to create Quant Template 
        When I have logged in as "media_producer_1"
        And I click on create course plus button
        And save the value to variable
            |variablename        | value    |
            |course_type         | Template |
            |product_model       | Qualitative |
            |course_name         | Qual Testcourse |
            |learning_Objective  | Introduction to Economics |
            |course_code         | E2E 301 |
            |isbn_number         | 9781464199498 |
            |course_status       | Draft |
            |save_button         | click |
        When I elect to create a course with the following data:
        And I validate that the course "$course.templatename" is listed in the courses page
        And I sign out of Achieve
    
    Scenario: Verify that Media Producer is able to add activities in Qunat Template
        When I have logged in as "media_producer_1"
        And I search for "Qual Testcourse"
        And I click on open menu
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I click on course card "Qual Testcourse" template
        And I click on Resource tab
        And I click on Add folder button for adding folder 
        And I create a folder with the name "Chapter 1: Pre-made Assesment"
        And I click on add folder button in order to save it
        And I click on Add folder button for adding folder 
        And I create a folder with the name "Chapter 2: Reading"
        And I click on add folder button in order to save it
        And I click on Add folder button for adding folder 
        And I create a folder with the name "Chapter 3: Custom-made Assesment"
        And I click on add folder button in order to save it
        And I click on Add folder button for adding folder 
        And I create a folder with the name "Chapter 4: File"
        And I click on add folder button in order to save it
        And save the value to variable 
             |variablename            | value    |
             |options_button          | click    |
             |reorder_button          | click    |
             |move_total_down_button  | click    |
             |save_reordered_button   | click    |
             |options_button          | click    |
             |reorder_button          | click    |
             |move_down_button        | click    |
             |save_reordered_button   | click    |
             |options_button_2        | click    |
             |reorder_button          | click    |
             |move_down_button        | click    |
             |save_reordered_button   | click    |
             |options_button_2        | click    |
             |reorder_button          | click    |
             |move_up_button          | click    |
             |save_reordered_button   | click    |      
        And I elect to create a course with the following data:      
        And add content into chapter by clicking "+" button
        And I click on Activity search button and enter "Homework"
        And I click on add content 
        And I click on Activity search button and enter "Guided learn and practice"
        And I click on add content 
        And I click on Activity search button and enter "Fractions"
        And I click on add content
        And I click on Activity search button and pass the value "The story of Psycology"
        And I click on add content
        And I click on Activity search button and pass the value "new test epub"
        And I click on add content
        And I click on Activity search button and pass the value "AT1nov"
        And I click on add content
        And save the value to variable 
             |variablename            | value    |
             |OpenActionMenu          | click    |
             |move_item_button        | click    |
             |Place_activity_chapter1 | click    |
             |save_button             | click    |
             |OpenActionMenu          |  click   |
             |move_item_button        | click    |
             |Place_activity_chapter1 | click    |
             |save_button             | click    |
             |OpenActionMenu          | click    |
             |move_item_button        | click    |
             |Place_activity_chapter2 | click    |
             |save_button             | click    |
             |OpenActionMenu          | click    |
             |move_item_button        | click    |
             |Place_activity_chapter2 | click    |
             |save_button             | click    |
             |OpenActionMenu          | click    |
             |move_item_button        | click    |
             |Place_activity_chapter4 | click    |
             |save_button             | click    |
             |OpenActionMenu          | click    |
             |move_item_button        | click    |
             |Place_activity_chapter4 | click    |
             |save_button             | click    |
        And I elect to create a course with the following data:
        And I validate the activities are added  
        And I sign out of Achieve    
    
    Scenario: Verify that Media Producer is able to add copy the course from Qualitative template
        When I have logged in as "media_producer_1" 
        When I search for "Qual Testcourse"
        And  I click on open menu
        Then I copy the course named "Testcourse" to the name "E301"
        And I sign out of Achieve
    
    Scenario: Verify that customer support is able to add instructor to the course copied from Qualitative Template
        When I have logged in as "customer_support_1"
        When I search for "E301"
        And I click on open menu
        Then I open the Manage Instructors page on the course named "$course1.name"
        And I manage the instructors on the course and add the "instructor_2" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve


    Scenario: Verify That an Instructor is able to add a custom created assesment acitvity in an Instructor created course from Qualitative Template  
        When I have logged in as "instructor_2"
        And I search for "E301"
        And I click on open menu
        And I elect to edit the course named "$course1.name"
        When save the values to course  
            |values             | course|
            |Template_status    | Active On Date |
            |Active_Date        | @Date('now')   |
            |course_end_date    | @Date('+2m')   |
        And I elect to edit the course with the following data
        And I click on open menu
        Then I capture the invite link and store to variable "inviteLink"
        And I populate the Invite Students "student" page 
        And I click on course card "Qual Testcourse" template present in instructor
        And I click on Resource tab
        And add content into chapter by clicking "+" button
        And I click on create custom button
        And I select activity button as assesment
        And create a custom task by passing the values for Assesement 1
        And I validate Custom Assesement is created
        And add content into chapter by clicking "+" button
        And I add the coustom task 
        And I sign out of Achieve
    
    Scenario: Verify that instructor is able to assign the activities in Qualitative Template
        When I have logged in as "instructor_2"
        And I click on course card "Qual Testcourse" template present in instructor
        And I click on Resource tab
        And I add the custom activity to chapter 
        And I click on courseplanner
        And I click on Assesment open menu action button to assign the course 
        And assign the values to variable
                |values                          | variable     |
                |activity_assign                 | click        |
                |Date_assign                     | @Date('now') |
                |Time_Hour                       | 12           |
                |Time_minute                     |  30          |
                |Time_period                     | AM           |
                |points_minimum                  | 5            |
                |Assign_button                   | click        |
        And I elect it with the following data:
        And I sign out of Achieve
    
    Scenario: Verify that student is able to enroll in a Instructor created course created from Quantitative Template
        Given I have opened Achieve "ThirdpartyURL"
        When I log in as "student"
        And I click on invite link send by instructor
        And I open the invite link and login with "student" account details
        And I click on Start grace period
        And I click on check box for purchace access for grace period 
        And I click on Finish Enrollment
        And I sign out of Achieve

       

