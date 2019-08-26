@Course @Smoke
Feature: Instructor attempts all the activities in Quantitative ICC Template

    @mediaproducer-delete-course
    @instructor-delete-course
    Scenario: Verify that Instructor is able to copy course from Quantitative ICC Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName                 | learningObjective               | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative ICC Template  | Principles of Microeconomics    | E2E 318      | 9781464199456  | draft         |                      


        And I activate the "Quantitative ICC Template" template and add the following data
             | courseName                 |  courseCode   |  templateStatus      |
             | Quantitative ICC Template  |   E2E 318     |  Active On Date      | 


        And I add the activities in resources to "Quantitative ICC Template" template
            | type                     | activity                                       |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)         |     
            | addButtonLearningcurve   | LC1551318608988                                |
            | addReadingButton         | Glossary                                       |
            | addButtonReadandpractice | Automation Test                                |
        And I click on home button to return to coursepage

        And I copy course from the "Quantitative ICC Template" template with the following data
            | courseName               | courseCode           |
            | Quantitative ICC Course  | E2E 318              |
       
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative ICC Course" course
        
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        And I create a course "Quantitative ICC Course" with the following data
            | field             | value                                  |
            | courseName        | Quantitative Instructor Course         |
            | courseCode        | E2E 318                                |

        Then I verify that "Course Copied." message is displayed
        And I close the popup message
        And I verify that "Quantitative Instructor Course" is created with following data
            | field                 | value                                |
            | courseName            | Quantitative Instructor Course       |
            | courseDate            |  E2E 318                             |
           
        

       
       
   