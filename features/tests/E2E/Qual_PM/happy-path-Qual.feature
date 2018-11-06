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
            |course_status       | Draft|
        When I elect to create a course with the following data:
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
        And I reorder the chapters in resource page
        And add content into chapter by clicking "+" button
        And I click on Activity search button and enter "Exercise: Standard English verb forms 2"
        And I click on add content 
        And I click on Activity search button and enter "Exercise: Misused words 1"
        And I click on add content 
        And I click on Activity search button and enter "Fractions"
        And I click on add content
        And I click on Activity search button and pass the value "Five Factors That Affect Statistical Power"
        And I click on add content
        And I click on Activity search button and pass the value "Chapter 6 figures, photos, tables (unlabeled)"
        And I click on add content
        And I click on Activity search button and pass the value "Chapter 6 figures, photos, tables (unlabeled)"
        And I click on add content  
        And I move the activities to the chapters assigned to it 
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
        And I manage the instructors on the course and add the "instructor_1" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve
    
    Scenario: Verify Instructor is able to custom created assesment acitvity in a Instructor created course in Qualitative Template 
        When I have logged in as "instructor_1"
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
        And I click on course card "E2E101"
        And I click on Resource tab of Testcourse


