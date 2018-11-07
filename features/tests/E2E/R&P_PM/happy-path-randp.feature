Feature: R&P happy path workflow 1

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
    
    Scenario: Verify that Media Producer is able to create Read&Practice Template 
        When I have logged in as "media_producer_1"
        When I click the create_course button to create course
        When save the value to variable
            |variablename        | value    |
            |course_type         | Template |
            |product_model       | Read & Practice |
            |course_name         | TestCourse |
            |course_code         | E2E 101 |
            |isbn_number         | 9781464199495 |
            |course_status       | Draft|
        When I elect to create a course with the following data:
        And I sign out of Achieve
    

    Scenario: Verify that Media Producer is able to add activities in Read&Practice Template 
        When I have logged in as "media_producer_1"
        And I click on open menu
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
            #|courseStatus   | activeOnDate   | saveBtn |
            #| Template      | @Date('now')   | Click   |
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I click on course card "Testcourse" template
        And I click on Resource tab
        And I create a folder named on the resources screen
        And I reorder the items on the course resource page to be in this order:
        And add content into chapter by clicking "+" button
        And I click on Activity search button and enter "Colliding Worlds"
        And I click on add content 
        And I click on Activity search button and enter "American Experiments"
        And I click on add content 
        And I click on Activity search button and enter "Personality Development in Adulthood"
        And I click on add content
        And I click on Activity search button and pass the value "do not use"
        And I click on add content
        Then I reorder the activity items to the chapters
        And I click on Activity search button and pass the value "DECIMALS"
        And I click on add content 
        And I click on Activity search button and pass the value "How to Read a Graph"
        And I click on add content 
        And I click on Activity search button and pass the value "LO asset verification Edited"
        And I sign out of Achieve

    Scenario: Verify that Media Producer is able to copy the course from Read&Practice Template 
        When I have logged in as "media_producer_1" 
        When I search for "Testcourse"
        And  I click on open menu
        Then I copy the course named "Testcourse" to the name "E2E101"
        And I sign out of Achieve

    Scenario: Verify that customer support is able to add instructor to the read& practice course  
        When I have logged in as "customer_support_1"
        When I search for "E2E101"
        And I click on open menu
        Then I open the Manage Instructors page on the course named "$course1.name"
        Then I manage the instructors on the course and add the "instructor_1" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve

    
    Scenario: Verify that Instructor is able to invite the students and activate the course 
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
        Then I populate the Invite Students "student" page 
        And I click on course card "E2E101"
        And I click on Resource tab of Testcourse
        And I click on Open Folder
        Then I click on Read and Practice 
        And I click on Target points
        And I click on Read&Practice
        And I click on Resource tab of Testcourse
        And I click on courseplanner
        And I click on Open Folder for activity
        And I click on chapter 1 R&P folder
        And I elect to assign the course
        And assign the values to variable
                |values           | variable |
                |Date_assign      | @Date('now') |
                |Time_Hour        | 12         |
                |Time_minute      |  30         |
                |Time_period      | AM          |
                |points_minimum   | 5           |
                |Assign_button    | click |
        And I elect it with the following data:
        And I sign out of Achieve
    
    #Scenario:Verify that paid access code creater able to generate access code for Read&Practice Template
       # When I have logged in as "paid_accessCC"
       # And I search for "Testcourse"
       # And I click on course card "Testcourse" template
       # And I click on user menu
       # And I click on Admin Panel 
       # Then I click on create access codes
       # And I select number of use codes
        # And length of the Access code
        #And I sign out of Achieve

    Scenario: Verify that student is able to enroll in a Instructor created course created from Read&Practice Template
        Given I have opened Achieve "ThirdpartyURL"
        When I log in as "student"
        And I open the invite link and login with "student" account details
        And I click on Start grace period
        And I click on check box for purchace access for grace period 
        And I click on Finish Enrollment
        And I sign out of Achieve

    Scenario: Verify that stident is able to attempt activities of Instructor created course from Read&Practice Template    
        When I have logged in as "student"
        And I click on course card "E2E101"
        And I click on Resuource tab
        And I click on Open Folder
        Then I click on Read and Practice 
        And I click on the reading material and validate whether the content is available 
        And I start the quiz 
        And I answer the questions
        And I click on submit button
        And I click on alert message
        #And I answer the questions
        #And I click on submit button
        #And I validate the content 
        #And I click on close message
        #And I click on Read&Practice
        # And I click on Gradebook
    
        




        
   

    

    



        
        



    





        
        



    








   