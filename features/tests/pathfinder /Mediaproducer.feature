Feature: Pathfinder Mediaproducer role

Mediaproducer is able to create skills Template and course 

Background:
        Given I have opened Achieve "loginURL"
    
    @courseware-logout
    Scenario:Verify that the Media Producer is able to create a Course Template with Product Model being "Skills"
        When I have logged in as "media_producer_1"
        And I click on create course plus button
        And I fill out the form to create a new course
            |pageDef             | value    |
            |course_type         | Template |
            |product_model       | Skills |
            |course_name         | Pathfinder Testcourse |
            |course_code         | E2E 501 |
            |isbn_number         | 9781464199410 |
            |course_status       | Draft |
            |save_button         | click |
        And I validate the message "Pathfinder Testcourse Created."
        And I validate that the course "$course.templatename" is listed in the courses page


    @courseware-logout
    Scenario:Verify that for the Pathfinder activities the application displays Diagnostic - Study plan, Diagnostic - Final Test, Diagnostic - Practice Test
        When I have logged in as "media_producer_1"
        And I search for "Pathfinder Testcourse" 
        And I click on pathfinder Test course card 
        And I click on Resource tab 
        And add content into chapter by clicking "+" button
        And I click on Activity search button and enter "Complete the Study Plan for Basic Chemistry"
        And I click on add content 
        And I click on Activity search button and enter "Complete 50% of the Study Plan for Punctuation, Style, and Mechanics - Hacker"
        And I click on add content 
        And I click on Activity search button and enter "Final Test for Sentence Grammar - Lunsford"
        And I click on add content
        And I click on Activity search button and pass the value "Final Test for Reading Strategies - Hacker"
        And I click on add content        
        And I click on Activity search button and pass the value "Practice Test for Word Problems"
        And I click on add content
        And I click on Activity search button and pass the value "Practice Test for Reporting Measurements & Data"
        And I click on add content 
        And I validte test courses are added to the skills Template


    @courseware-logout
    Scenario: Verify that the Mediaproducer is able to add pathfinder activities to a Course Template
        When I have logged in as "media_producer_1"
        And I search for "Pathfinder Testcourse" 
        And  I click on course settings
        Then I copy the course named "Testcourse" to the name "E2E501"
        And I validate the message "Course Copied."
    

    @courseware-logout
    Scenario: Verify that Mediaproducer is able to see grade same as Instrcutor is able to see the grade
        When I have logged in as "media_producer_1"
        And I search for "Pathfinder Testcourse"
        And I click on pathfinder Test course card 
        And I click on Grade book 
        And I validate admin is able to see the grade same as instructor 



