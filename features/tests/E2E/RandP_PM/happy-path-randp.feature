Feature: R&P happy path workflow 1

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
    
    # Scenario: Verify that Media Producer is able to create Read&Practice Template 
    #     When I have logged in as "media_producer_1"
    #     And I click on create course plus button
    #     And save the value to variable
    #         |variablename        | value    |
    #         |course_type         | Template |
    #         |product_model       | Read & Practice |
    #         |course_name         | R&P TestCourse |
    #         |course_code         | E2E 101 |
    #         |isbn_number         | 9781464199495 |
    #         |course_status       | Draft |
    #         |save_button         | click |
    #     And I elect to create a course with the following data:
    #     And I validate the message "R&P TestCourse Created."
    #     Then I validate that the course "$course.templatename" is listed in the courses page
    #     And I sign out of Achieve
    

    # Scenario: Verify that Media Producer is able to add activities in Read&Practice Template 
    #     When I have logged in as "media_producer_1"
    #     And I search for "R&P Testcourse"
    #     And I click on course settings
    #     And I elect to edit the course named "course1.templatename"
    #     And save the value to variables 
    #         |variablesname     | value |
    #         |Template_status   | Active On Date |
    #         |Active_Date       | @Date('now')   |
    #     And I elect to edit the course with the following data:
    #     And I validate the message "R&P TestCourse Updated."
    #     Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
    #     And I click on course card "Testcourse" template
    #     And I click on Resource tab       
    #     And add content into chapter by clicking "+" button
    #     And I click on Activity search button and enter "Colliding Worlds"
    #     And I click on add content 
    #     And I click on Activity search button and enter "Chapter 2:American Experiments"
    #     And I click on add content 
    #     And I click on Activity search button and enter "Argument: Reasoning and Logical Fallacies"
    #     And I click on add content
    #     And I click on Activity search button and pass the value "do not use"
    #     And I click on add content
    #     And I click on Activity search button and pass the value "DECIMALS"
    #     And I click on add content
    #     And I click on Activity search button and pass the value "How to Read a Graph"
    #     And I click on add content
    #     And I click on Activity search button and pass the value "9897989798187_FC.jpg"
    #     And I click on add content
    #     And I click on Activity search button and pass the value "9897989798183_FC.jpg"
    #     And I click on add content 
    #     And I validate the activities are added 
    #     And I sign out of Achieve

    # Scenario: Verify that Media Producer is able to copy the course from Read&Practice Template 
    #     When I have logged in as "media_producer_1" 
    #     And  I search for "R&P Testcourse"
    #     And  I click on course settings
    #     Then I copy the course named "Testcourse" to the name "E2E101"
    #     And I validate the message "Course Copied."
    #     And I sign out of Achieve

    # Scenario: Verify that customer support is able to add instructor to the read& practice course  
    #     When I have logged in as "customer_support_1"
    #     When I search for "E2E101"
    #     And I click on course settings
    #     Then I open the Manage Instructors page on the course named "$course1.name"
    #     Then I manage the instructors on the course and add the "instructor_1" loginUser
    #     And I close the Manage Instructors page
    #     And I sign out of Achieve

    
    Scenario: Verify that Instructor is able to invite the students and activate the course 
        When I have logged in as "instructor_1"
        And I click on Instructor button
        # And I click on course settings
        # And I elect to edit the course named "$course1.name"
        # When save the values to course  
        #     |values             | course|
        #     |Template_status    | Active On Date |
        #     |Active_Date        | @Date('now')   |
        #     |course_end_date    | @Date('+2m')   |
        # And I elect to edit the course with the following data
        # And I click on course settings
        # Then I capture the invite link and store to variable "inviteLink"
        # Then I populate the Invite Students "student" page 
        And I click on course card "E2E101"
        And I click on courseplanner
        And I click on show library button 
        And I click on Add button to add activities 
        
       

    Scenario: Verify that user is able to delete the course
        When I have logged in as "media_producer_1"
        And I search for "R&P Testcourse"
        And I click on course settings 
        And I click on delete the course
        And I search for "E2E 101"
        And I click on course settings 
        And I click on delete the course
        And I sign out of Achieve

        




        
   

    

    



        
        



    





        
        



    








   