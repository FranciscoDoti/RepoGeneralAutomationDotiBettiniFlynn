@Course @Smoke
Feature: Adding activities to the template

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName           |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills MPA Template  |                  | E2E 363      | 9781464199409  | draft         |                     

        And I activate the "Skills MPA Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills MPA Template       |   E2E 363     |  Active On Date      |

        And I add the activities in resources to "Skills MPA Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        Then I verify that activties are added
            | activity                                      |
            | Exercise: Misused words 1 (autoscored)        |     
            | LC1551301608988                               |
            |  GLOSSARY                                     |            