@Course @Smoke
Feature: Adding activities to Qualitative template

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Media Producer is able to add activities to Qualitative template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Glossary                                     |

        Then I verify that activties are added
            | activity                                      |
            | Exercise: Misused words 1 (autoscored)        |     
            | LC1551301608988                               |
            |  Glossary                                     |            
