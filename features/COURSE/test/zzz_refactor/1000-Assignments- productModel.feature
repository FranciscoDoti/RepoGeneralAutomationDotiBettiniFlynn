Feature: Qual happy path workflow 

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
    
    Scenario: Verify that Media Producer is able to create Quant Template 
        When I have logged in as "media_producer_2"
        And I click on create course plus button
        And I fill out the form to create a new course
            |pageDef             | value    |
            |course_type         | Template |
            |product_model       | Skills |
            |course_name         | TestingCourse Writer's Help 3.0 |
            |course_code         | E2E 401 |
            |isbn_number         | 9781464199499 |
            |course_status       | Draft |
            |save_button         | click |
        And I validate the message "TestingCourse Writer's Help 3.0 Created."
        And I validate that the course "$course.templatename" is listed in the courses page
        And I sign out of Achieve
        
    @courseware-logout  
    Scenario: Verify that Media Producer is able to add activities in Qunat Template
        When I have logged in as "media_producer_2"
        And I click on course settings
        When I elect to edit the course named "course1.templatename"
        And I fill out the form to create a new course
            |pageDef         |  value |
            |Template_status | Active On Date|
            |save_button     | click |
        And I click on course card 'TestingCourse Writer's Help 3.0' template
        And I click on Resource tab
        And add content into chapter by clicking "+" button
       And I click on create custom activity first
        And I click on add folder button 
        And add content into chapter by clicking "+" button
        And I click on Add plus button to add activities
    
    @courseware-logout
    Scenario: Verify that Media Producer is able to copy the course from Writing Template 
        When I have logged in as "media_producer_1" 
        #And  I search for "TestingCourse Writer's Help 3.0"
        And  I click on course settings
        Then I copy the course named "Testcourse" to the name "TestingCourse Writer's Help 3.0 E2E301"
        And I validate the message "Course Copied."
    