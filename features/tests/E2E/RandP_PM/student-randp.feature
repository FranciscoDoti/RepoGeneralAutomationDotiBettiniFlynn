Feature: R&P happy path workflow student

Student complete the activities assigned
   
Background:
        Given I have opened Achieve "loginURL"

    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor created Read&Practice course created from Read & Practice template 
        When I have logged in as "student"
        And I click on course card "E2E101"
        And I click on course plan in student account 
        And I click on read and Practice activity 
        Then I click on the reading material and validate whether the content is available
        And I click on Quiz button 
        And I take the Quiz
        And I validate the marks are displayed in gradebook 

    
    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor created Learning curve course created from Read&Practice Template
        When I have logged in as "student"
        And I click on course card "E2E101"
        And I click on course plan in student account
        And I click on learning curve activity 
        And I click on Begin activity button 
        And I take the Quiz
        And I validate the marks are displayed in gradebook 

    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor created Reading and file course created from Read&Practice Template
        When I have logged in as "student"
        And I click on course card "E2E101"
        And I click on course plan in student account
        And I click on Reading activity 
        And I validate the content is displayed
        And I click on file activity 
        And I validate that file is downloaded 







    