Feature: Qunat happy path workflow 

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
    
    Scenario: Verify that Media Producer is able to create Quant Template 
        When I have logged in as "media_producer_1"
        And I click on create course plus button
        And save the value to variable
            |variablename        | value    |
            |course_type         | Template |
            |product_model       | Quantitative |
            |course_name         | Quant Testcourse |
            |learning_Objective  | macmillan calculus |
            |course_code         | E2E 201 |
            |isbn_number         | 9781464199497 |
            |course_status       | Draft|
            |save_button         | click |
        When I elect to create a course with the following data:
        Then I validate that the course "$course.templatename" is listed in the courses page
        And I sign out of Achieve
    
    Scenario: Verify that Media Producer is able to add activities in Qunat Template
        When I have logged in as "media_producer_1"
        And I search for "Quant Testcourse"
        And I click on course settings
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I click on course card of Quant Template 
        And I click on Resource tab      
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
        And I sign out of Achieve    


    Scenario: Verify that Media Producer is able to copy the course from Quantitative Template 
        When I have logged in as "media_producer_1" 
        When I search for "Quant Testcourse"
        And  I click on course settings
        Then I copy the course named "Testcourse" to the name "E2E201"
        And I sign out of Achieve

    Scenario: Verify that customer support is able to add instructor to the Quantitative course  
        When I have logged in as "customer_support_1"
        When I search for "E2E201"
        And I click on course settings
        Then I open the Manage Instructors page on the course named "$course1.name"
        Then I manage the instructors on the course and add the "instructor_3" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve
    

    Scenario: Verify That an Instructor is able to add a custom created assesment acitvity in an Instructor created course from Quantitative Template  
        When I have logged in as "instructor_3"
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
        And I click on course card of Quant Template as instructor 
        And I click on courseplanner
        
    Scenario: Verify that user is able to delete the course
        When I have logged in as "media_producer_1"
        And I search for "Quant Testcourse"
        And I click on course settings 
        And I click on delete the course
        And I search for "E2E201"
        And I click on course settings 
        And I click on delete the course
        And I sign out of Achieve

