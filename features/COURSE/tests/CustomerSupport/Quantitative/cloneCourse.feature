Feature: Customer Support attempts all the activities in Quantitative Template

    @delete-customerSupport-9781464199499
    Scenario: Verify that Customer Support is able to create course from Quantitative Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When  I create "Quantitative Template" with ISBN "9781464199498"
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
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
            | addReadingButton        | Dedication                             |
            | addButtonReadandpractice | LCRP1550612138614                            |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Quantitative Template" to search the course
                
        And I copy course from the "Quantitative Template" template with the following data
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        | E2E301                       |

        And I click on search button and input "Quantitative Course" to search the course
        
        Then I verify that "Quantitative Course" is created with following data
            | field                 | value                     |
            | courseName            | Quantitative Course       |
            | courseDate            |  E2E301                   |
           
        