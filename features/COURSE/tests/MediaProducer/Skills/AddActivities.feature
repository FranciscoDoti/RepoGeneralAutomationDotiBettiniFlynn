@Course @Smoke
Feature: Adding activities to the template

    @delete-mediaproducer-courses
    Scenario: Verify that Media Producer is able to add activities to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" Template with following data 
            | courseType  | productModel | courseName       | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  | E2E 301      | 9781464199498 | draft         |                      

        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Skills Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Dedication                                   |

        Then I verify that activties are added
            | activity                                      |
            | Exercise: Misused words 1 (autoscored)        |     
            | LC1551301608988                               |
            |  Dedication                                   |            