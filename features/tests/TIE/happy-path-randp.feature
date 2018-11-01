Feature: R&P happy path workflow 1

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
  
    Scenario: Student enroll in the class and takes the quiz after reading the content assigned to the student in read&practice activity 
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
    
    
        




        
   

    

    



        
        



    








   