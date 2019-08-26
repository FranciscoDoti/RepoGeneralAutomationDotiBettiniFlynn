@Course @Smoke
Feature: Instructor attempts all the activities in Read & Practice ICC Template

    @mediaproducer-delete-course   
    @instructor-delete-course
    Scenario: Verify that Instructor is able to copy course from Read & Practice ICC Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                      |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice ICC Template    |                  | E2E 321      | 9781464199452  | draft         |                     


        And I activate the "Read & Practice ICC Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice ICC Template  |   E2E 321     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice ICC Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551321608988                               |
            | addReadingButton         | GLOSSARY                                      |
            | addButtonReadandpractice | Automation Test                               |
        And I click on home button to return to coursepage

        And I copy course from the "Read & Practice ICC Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice ICC Course  | E2E 321              |
       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice ICC Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Read & Practice ICC Course" with the following data
            | field             | value                                     |
            | courseName        | Read & Practice Instructor Course         |
            | courseCode        | E2E 321                                   |
         
        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And I verify that "Read & Practice Instructor Course" is created with following data
            | field                 | value                                   |
            | courseName            | Read & Practice Instructor Course       |
            | courseDate            |  E2E 321                                |
           
        

       
       
   