@Course @Smoke
Feature: Adding activities to the template

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                 | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative MPA Template  | Principles of Microeconomics      | E2E 346      | 9781464199426  | draft         |   
            

        And I activate the "Quantitative MPA Template" template and add the following data
             | courseName                 |  courseCode   |  templateStatus      |
             | Quantitative MPA Template  |   E2E 346     |  Active On Date      | 


        And I add the activities in resources to "Quantitative MPA Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551346608988                               |
            | addReadingButton        |  Glossary                                     |

        Then I verify that activties are added
            | activity                                      |
            | Exercise: Misused words 1 (autoscored)        |     
            | LC1551346608988                               |
            |  Glossary                                     |            