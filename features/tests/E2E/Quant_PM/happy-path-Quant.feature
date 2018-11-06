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
        When I elect to create a course with the following data:
        And I sign out of Achieve
    
    Scenario: Verify that Media Producer is able to add activities in Qunat Template
        When I have logged in as "media_producer_1"
        And I search for "Quant Testcourse"
        And I click on open menu
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I click on course card "Testcourse" template
        And I click on Resource tab
        And I create a folder named on the resources screen
        And I reorder the items on the course resource page to be in this order:
        And add content into chapter by clicking "+" button
        And I click on Activity search button and enter ""
        And I click on add content 
        And I click on Activity search button and enter ""
        And I click on add content 
        And I click on Activity search button and enter "Thinking about genres and media"
        And I click on add content
        And I click on Activity search button and pass the value "Revising thesis and support"
        And I click on add content
        Then I reorder the items 
        And I click on Activity search button and pass the value ""
        And I sign out of Achieve


    Scenario: Verify that Media Producer is able to copy the course from Quantitative Template 
        When I have logged in as "media_producer_1" 
        When I search for "Testcourse"
        And  I click on open menu
        Then I copy the course named "Testcourse" to the name "E2E202"
        And I sign out of Achieve

    Scenario: Verify that customer support is able to add instructor to the Quantitative course  
        When I have logged in as "customer_support_1"
        When I search for "E2E202"
        And I click on open menu
        Then I open the Manage Instructors page on the course named "$course1.name"
        Then I manage the instructors on the course and add the "instructor_1" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve