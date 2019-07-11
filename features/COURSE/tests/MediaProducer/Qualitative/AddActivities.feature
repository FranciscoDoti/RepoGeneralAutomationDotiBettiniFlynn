@Course
@Smoke
Feature: Adding activities to the template

    @delete-mediaproducer-courses
    Scenario: Verify that Media Producer is able to add activities to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Qualitative Template" with ISBN "9781464199498" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | learningObjective | macmillan calculus           |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                        |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Dedication                                   |

        Then I verify that activties are added
            | activity                                      |
            | Exercise: Misused words 1 (autoscored)        |     
            | LC1551301608988                               |
            |  Dedication                                   |            