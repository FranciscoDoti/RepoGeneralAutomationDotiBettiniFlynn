Feature: R&P happy path workflow student

Student complete the activities assigned
   


    @coureseware-logout
    Scenario: Enroll into course with link and access code
        When I check E-mail Notification of "student" for "courseware"
        And I have logged in as "student"
        And I click on Grace period
        And I click on Finish Enrollenment 
        Then I validate that the following information is correct on the Course Access Code page
        
    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor created Read&Practice course created from Read & Practice template 
        # When I have logged in as "student"
        # And I click on course card "E2E101"
        # And I click on course plan in student account 
        When I have opened Achieve "courseUrl"
        And I have logged in as "student"
        And I click on read and Practice activity 
        Then I click on the reading material and validate whether the content is available
        And I click on Quiz button 
        And I take the Quiz
        And I click on viewstudy plan button
        # And I validate the marks are displayed in gradebook 

    
    # @coureseware-logout
    # Scenario: Verify that Student is able to attempt activities of a Instructor created Learning curve course created from Read&Practice Template
    #     When I have logged in as "student"
    #     And I click on course card "E2E101"
    #     And I click on course plan in student account
    #     And I click on learning curve activity 
    #     And I click on Begin activity button 
    #     And I take the Quiz
    #     And I validate the marks are displayed in gradebook 

    # @coureseware-logout
    # Scenario: Verify that Student is able to attempt activities of a Instructor created Reading and file course created from Read&Practice Template
    #     When I have logged in as "student"
    #     And I click on course card "E2E101"
    #     And I click on course plan in student account
    #     And I click on Reading activity 
    #     And I validate the content is displayed
    #     And I click on file activity 
    #     And I validate that file is downloaded 







    