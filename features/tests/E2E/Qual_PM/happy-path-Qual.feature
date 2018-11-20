Feature: Qual happy path workflow 

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"

    Scenario: Verify that Media Producer is able to create Quant Template 
        When I have logged in as "media_producer_2"
        And I click on create course plus button
        And save the value to variable
            |variablename        | value    |
            |course_type         | Template |
            |product_model       | Qualitative |
            |course_name         | Qual Testcourse |
            |learning_Objective  | Principles of Economics |
            |course_code         | E2E 301 |
            |isbn_number         | 9781464199498 |
            |course_status       | Draft |
            |save_button         | click |
        When I elect to create a course with the following data:
        And I validate that the course "$course.templatename" is listed in the courses page
        And I sign out of Achieve
    
    Scenario: Verify that Media Producer is able to add activities in Qunat Template
        When I have logged in as "media_producer_2"
        And I search for "Qual Testcourse"
        And I click on course settings
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I click on course card "Qual Testcourse" template
        And I click on Resource tab     
        And add content into chapter by clicking "+" button
        And I click on Activity search button and enter "Homework"
        And I click on add content 
        And I click on Activity search button and enter "Animation"
        And I click on add content 
        And I click on Activity search button and enter "Analyzing Drama"
        And I click on add content
        And I click on Activity search button and pass the value "Dedication"
        And I click on add content
        And I click on Activity search button and pass the value "new test epub"
        And I click on add content
        And I click on Activity search button and pass the value "AT1nov"
        And I click on add content   
        And I sign out of Achieve    
    
    Scenario: Verify that Media Producer is able to add copy the course from Qualitative template
        When I have logged in as "media_producer_2" 
        When I search for "Qual Testcourse"
        And  I click on course settings
        Then I copy the course named "Testcourse" to the name "E301"
        And I sign out of Achieve
    
    Scenario: Verify that customer support is able to add instructor to the course copied from Qualitative Template
        When I have logged in as "customer_support_2"
        When I search for "E301"
        And I click on course settings
        Then I open the Manage Instructors page on the course named "$course1.name"
        And I manage the instructors on the course and add the "instructor_3" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve


    Scenario: Verify That an Instructor is able to add a custom created assesment acitvity in an Instructor created course from Qualitative Template  
        When I have logged in as "instructor_3"
        And I search for "E301"
        And I click on course settings
        And I elect to edit the course named "$course1.name"
        When save the values to course  
            |values             | course|
            |Template_status    | Active On Date |
            |Active_Date        | @Date('now')   |
            |course_end_date    | @Date('+2m')   |
        And I elect to edit the course with the following data
        And I click on course settings
        Then I capture the invite link and store to variable "inviteLink"
        And I populate the Invite Students "student" page 
        And I click on course card "Qual Testcourse" template present in instructor
    
        
    Scenario: Verify that user is able to delete the course
            When I have logged in as "media_producer_2"
            And I search for "Qual Testcourse"
            And I click on course settings 
            And I click on delete the course
            And I search for "E301"
            And I click on course settings 
            And I click on delete the course
            And I sign out of Achieve
       

