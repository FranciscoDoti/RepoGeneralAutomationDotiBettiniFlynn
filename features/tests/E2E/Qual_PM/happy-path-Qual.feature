Feature: Qual happy path workflow 

# Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
        
    @courseware-logout
    Scenario: Verify that Media Producer is able to create Quant Template 
        When I have logged in as "media_producer_2"
        And I click on create course plus button
        And I fill out the form to create a new course
            |pageDef             | value    |
            |course_type         | Template |
            |product_model       | Qualitative |
            |course_name         | Qual Testcourse |
            |learning_Objective  | Principles of Economics |
            |course_code         | E2E 301 |
            |isbn_number         | 9781464199498 |
            |course_status       | Draft |
            |save_button         | click |
        And I validate the message "Qual Testcourse Created."
        And I validate that the course "$course.templatename" is listed in the courses page
       
    @courseware-logout
    Scenario: Verify that Media Producer is able to add activities in Qunat Template
        When I have logged in as "media_producer_2"
        And I search for "Qual Testcourse"
        And I click on course settings
        When I elect to edit the course named "course1.templatename"
        And I fill out the form to create a new course
            |pageDef         |  value |
            |Template_status | Active On Date|
            |save_button     | click |
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

    @courseware-logout
    Scenario: Verify that Media Producer is able to copy the course from Qual Template 
        When I have logged in as "media_producer_2" 
        And  I search for "Qual Testcourse"
        And  I click on course settings
        Then I copy the course named "Testcourse" to the name "E301"
        And I validate the message "Course Copied."
          
         
    @courseware-logout
    Scenario: Verify that customer support is able to add instructor to the course copied from Qualitative Template
        When I have logged in as "customer_support_2"
        When I search for "E301"
        And I click on course settings
        Then I open the Manage Instructors page on the course named "$course1.name"
        And I manage the instructors on the course and add the "instructor_1" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page


    @courseware-logout
    Scenario: Verify That an Instructor is able to add a custom created assesment acitvity in an Instructor created course from Qualitative Template  
        When I have logged in as "instructor_1"
        And I click on course settings
        And I elect to edit the course named "$course1.name"
        And I activate the course
        And I click on course settings
        Then I capture the invite link and store to variable "inviteLink"
        And I populate the Invite Students "student" page 
        And I click on course card Qual Testcourse template
        And I click on courseplanner
        And I click on show library button 
        And I click on Custom content button
        And I click on create custom activity button 
        And I click on Select activity Assesment Button
        And create a custom task by passing the values for Assesement 1
        And I validate Custom Assesement is created
        And I click on Add button to add activities
        And I change the course from unassigned to assign
    
    @coureseware-logout
    Scenario: Enroll into course with link and access code
        When I check E-mail Notification of "student" for "courseware"
        And I have logged in as "student"
        And I click on Grace period
        And I click on Finish Enrollenment 
        # Then I validate that the following information is correct on the Course Access Code page
        
    
    # @courseware-logout   
    # Scenario: Verify that user is able to delete the course
    #     When I have logged in as "media_producer_2"
    #     And I search for "Qual Testcourse"
    #     And I click on course settings 
    #     And I click on delete the course
    #     And I search for "E301"
    #     And I click on course settings 
    #     And I click on delete the course
            
       


