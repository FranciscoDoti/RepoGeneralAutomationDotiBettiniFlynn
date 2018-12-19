Feature: R&P happy path workflow student

Student enrolls in the course
   
Background:
        Given I have opened Achieve "loginURL"

    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor created pre-made assesment course created from Quantitative template 
        When I have logged in as "student"
        And I click on course card Qual Testcourse template 
        And I click on course plan in student account 
        And I click on pre-made assesment activity  
        And I answer the Questions in assement activity 
        And I validate the marks are displayed in gradebook 

    
    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor custom made assesment course created from Quantitative Template
        When I have logged in as "student"
        And I click on course card Qual Testcourse template 
        And I click on course plan in student account
        And I click on custom made assement activity
        And I answer the Questions in assement activity 
        And I validate the marks are displayed in gradebook   


    @coureseware-logout
    Scenario: Verify that Student is able to attempt activities of a Instructor created Reading and file course created from Quantitative Template
        When I have logged in as "student"
        And I click on course card Qual Testcourse template
        And I click on course plan in student account
        And I click on Reading activity 
        And I validate the content is displayed
        And I click on file activity 
        And I validate that file is downloaded 




   
   

    