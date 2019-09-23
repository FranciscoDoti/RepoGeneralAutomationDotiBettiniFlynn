@Course @Smoke
Feature: Instructor attempts all the activities in Read & Practice Template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate   
    @instructor-delete-course
    Scenario: Verify that Instructor is able to copy course from Read & Practice Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                     


        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | GLOSSARY                                      |
            | addButtonReadandpractice | LCRP1550612138614                             |
        And I click on home button to return to coursepage
        And I click on "Course Templates" tab 

        And I copy course from the "Read & Practice Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 301              |
       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Read & Practice Course" with the following data
            | field             | value                                     |
            | courseName        | Read & Practice Instructor Course         |
            | courseCode        | E2E 301                                    |
         
        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And I verify that "Read & Practice Instructor Course" is created with following data
            | field                 | value                                   |
            | courseCard            | Read & Practice Instructor Course       |
            | courseStatus          |  Draft                                  |
           
        

       
       
   