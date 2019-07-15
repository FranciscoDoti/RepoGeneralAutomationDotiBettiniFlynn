@Course @Smoke
Feature: Media Editor has only view access that they are not a collaborator

     @delete-mediaproducer-courses
    Scenario: Verify that Media Editor has only view access that they are not collaborator

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName       | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  | Principles of Microeconomics      | E2E 301      | 9781464199498 | draft         |   

        And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Quantitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Dedication                                   |

        And I sign out of Achieve

        And I login to Achieve-CW as "media_editor_1"

        Then I verify that media editor has only view access to "Quantitative Template"
        
