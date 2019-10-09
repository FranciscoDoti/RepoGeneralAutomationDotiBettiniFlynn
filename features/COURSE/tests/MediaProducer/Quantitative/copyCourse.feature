@Course @Smoke
Feature: Copy course Quantitative Template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Copy a course from Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I add the activities in resources to "Quantitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Glossary                                   |

        And I click on home button to return to coursepage

        And I click on "Course Templates" tab 
        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course  | E2E 301             |
        
        And I click on "Courses" tab 

        Then I verify that "Quantitative Course" is created with following data
            | CourseName            | Status                    |
            | Quantitative Course   |  Draft                    |
           



