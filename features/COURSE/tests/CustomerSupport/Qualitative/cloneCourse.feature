@Course @Smoke
Feature: Customer Support attempts all the activities in Qualitative Template

    @delete-customerSupport-9781464199499
    Scenario: Verify that Customer Support is able to create course from Qualitative Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When  I create "Qualitative Template" with ISBN "9781464199498" and course code "E2E 301"
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | learningObjective | macmillan calculus           |
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
            | addReadingButton        | Dedication                                    |
            | addButtonReadandpractice | LCRP1550612138614                            |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Qualitative Template" to search the course
                
        And I copy course from the "Qualitative Template" template with the following data
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        | E2E301                       |

        And I click on search button and input "Qualitative Course" to search the course
        
        Then I verify that "Qualitative Course" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative Course        |
            | courseDate            |  E2E301                   |
           
        