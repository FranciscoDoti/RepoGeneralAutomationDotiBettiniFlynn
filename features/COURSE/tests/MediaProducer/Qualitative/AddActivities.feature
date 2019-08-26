@Course @Smoke
Feature: Adding activities to the template

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative MPA Template  | macmillan calculus     | E2E 336      | 9781464199435  | draft         |                      


        And I activate the "Qualitative MPA Template" template and add the following data
            | courseName                 |  courseCode   |  templateStatus      |
            | Qualitative MPA Template   |   E2E 336     |  Active On Date      | 

        And I add the activities in resources to "Qualitative MPA Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551336608988                               |
            | addReadingButton        |  Dedication                                   |

        Then I verify that activties are added
            | activity                                      |
            | Exercise: Misused words 1 (autoscored)        |     
            | LC1551336608988                               |
            |  Dedication                                   |            
