@Course @Smoke
Feature: Copy course Qualitative template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Copy a course from Qualitative template

      Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Glossary                                   |

        And I click on home button to return to coursepage
        And I click on "Course Templates" tab 
        And I copy course from the "Qualitative Template" template with the following data
            | courseName          | courseCode           |
            | Qualitative Course  | E2E 301              |
            
        And I click on "Courses" tab 

        Then I verify that "Qualitative Course" is created with following data
            | field                 | value                     |
            | courseCard            | Qualitative Course        |
            | Status                |  Draft                    |
           



