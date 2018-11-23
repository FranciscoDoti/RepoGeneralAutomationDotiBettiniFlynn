Feature: R&P happy path workflow 2


Background:
        Given I have opened Achieve "loginURL"

  Scenario: Create Course in Achieve for Writing 
        When I have logged in as "media_producer_2"
        And I click on create course plus button
       And I fill out the form to create a new course
            |pageDef             | value    |
            |course_type         | Template |
            |product_model       | Skills |
            |course_name         | TestingCourse Writer's Help 3.0 |
            |course_code         | E2E 201 |
            |isbn_number         | 9781464199499 |
            |course_status       | Draft |
            |save_button         | click |
        And I populate from the dataTable
        Then I validate that the course "$course.templatename" is listed in the courses page
        And I sign out of Achieve
       
    Scenario: Convert a Skills template from a draft to a Template
        When I have logged in as "media_producer_2"
        #And I search for 'TestingCourse Writer's Help 3.0'
        And I click on course settings
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I click on course card 'TestingCourse Writer's Help 3.0' template
        And I click on Resource tab     
        And add content into chapter by clicking "+" button
        And I click on Activity search button and enter "Final Test for Units & Measurements"
        And I click on add content 
        And I click on Activity search button and enter "Practice Test for Units & Measurements"
        And I click on add content 
        And I click on Activity search button and enter "Visual Synthesis Map-Harnessing Energy: "
        And I click on add content
        And I click on Activity search button and pass the value "Work It Out Ch. 4: Consumer and Producer Surplus"
        And I click on add content
        And I click on Activity search button and pass the value "Apostrophes"
        And I click on add content
        And I click on Activity search button and pass the value "Active and Passive Voice"
        And I click on add content 
        And I click on Activity search button and pass the value "9897989798187_FC.jpg"
        And I click on add content 
        And I click on Activity search button and pass the value "9897989798187_FC.jpg"
        And I click on add content 
        And I sign out of Achieve    

   Scenario: Verify that Media Producer is able to copy the course from Writing Template 
        When I have logged in as "media_producer_1" 
        #And  I search for "TestingCourse Writer's Help 3.0"
        And  I click on course settings
        Then I copy the course named "Testcourse" to the name "E2E201"
        And I validate the message "Course Copied."
        And I sign out of Achieve

    Scenario: Verify that customer support is able to add instructor to the Writing course  
        When I have logged in as "customer_support_1"
        When I search for "E2E201"
        And I click on course settings
        Then I open the Manage Instructors page on the course named "$course1.name"
        Then I manage the instructors on the course and add the "instructor_1" loginUser
        And I close the Manage Instructors page
        And I sign out of Achieve
    
    Scenario: Verify that Instructor is able to invite the students and activate the course 
        When I have logged in as "instructor_1"
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
        Then I populate the Invite Students "student" page 
        And I click on course card "E2E101"
        And I click on courseplanner
        And I click on show library button 
        And I click on Add button to add activities
        And I change the course from unassigned to assign
        And I sign out of Achieve

    
    



        
        



       

