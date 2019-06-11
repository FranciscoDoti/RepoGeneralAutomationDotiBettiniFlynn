Feature: Adding activities in Folder Resource Tab

    Scenario: Verify that Media Producer is able to add activities in folder present in resource tab

        Given I login to Achieve-CW as "media_producer_2"
        When I create Course Template with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Quantitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  About The Authors                            |

        And I add folders in resource tab
            | folders        |
            | Reading        |
            | Learning Curve |
            | Assesment      |

        And I add the activities to respective folders in resource tab
            | activity                                      | folders        |
            | Exercise: Misused words 1 (autoscored)        | Assesment      |
            | LC1551301608988                               | Learning Curve |
            | About The Authors                             | Reading        |

        Then I verify the activities are added in folders
            | folders        |
            | Reading        |
            | Learning Curve |
            | Assesment      |


    
    