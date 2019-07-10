@Smoke
Feature: Copy course from the Template

    @delete-mediaproducer-courses
    Scenario: Copy a course from the Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills Template              |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Skills Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Dedication                            |

        And I click on home button to return to coursepage
        And I copy course from the "Skills Template" template with the following data
            | field             | value                        |
            | courseName        | Skills Course          |
            | courseCode        | E2E301                       |

        Then I verify that "Skills Course" is created with following data
            | field                 | value                     |
            | courseName            | Skills Course       |
            | courseDate            |  E2E301                   |
           



