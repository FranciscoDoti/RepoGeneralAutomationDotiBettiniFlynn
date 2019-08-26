@Course @Smoke
Feature: Instructor attempts all the activities in Qualitative ICC Templtae

    @mediaproducer-delete-course
    @instructor-delete-course
    Scenario: Verify that Instructor is able to copy course from Qualitative ICC Templtae
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative ICC Templtae  | macmillan calculus     | E2E 315      | 9781464199460  | draft         |                      


        And I activate the "Qualitative ICC Templtae" template and add the following data
            | courseName                 |  courseCode   |  templateStatus      |
            | Qualitative ICC Templtae   |   E2E 315     |  Active On Date      | 

        And I add the activities in resources to "Qualitative ICC Templtae" template
            | type                     | activity                                       |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)         |     
            | addButtonLearningcurve   | LC1551315608988                                |    
            | addReadingButton         | Glossary                                       |
            | addButtonReadandpractice | Automation Test                                |
        And I click on home button to return to coursepage

        And I copy course from the "Qualitative ICC Templtae" template with the following data
            | courseName              | courseCode           |
            | Qualitative ICC Course  | E2E 315              |
       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative ICC Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Qualitative ICC Course" with the following data
            | field             | value                                  |
            | courseName        | Qualitative Instructor Course          |
            | courseCode        | E2E 315                                |

        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And I verify that "Qualitative Instructor Course" is created with following data
            | field                 | value                                |
            | courseName            | Qualitative Instructor Course        |
            | courseDate            |  E2E 315                             |
           
        

       
       
   