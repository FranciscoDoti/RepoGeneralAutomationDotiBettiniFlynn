Feature: Assigning the activities present in the course 

    Scenario: Verify that Instructor is able to assign the activities in the course

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
            | addReadingButton        |  About The Authors |

        And I click on home button to return to coursepage
        And I copy course from the "Quantitative Template" template with the following data
            | field             | value                        |
            | course            | Quantitative Course          |
            | courseCode        | E2E301                       |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_2" to the "Quantitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_2"

        When I activate  "Quantitative Course" course with following data 
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        |  E2E301                      |
            | templateStatus    |  Active On Date              |

     
        And I add the activities in courseplanner to "Quantitative Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551301608988                                                   |


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | Exercise: Misused words 1 (autoscored)                           | 5      | 
            | LC1551301608988                                                  | 5      |
            | About The Authors                     | 5      |