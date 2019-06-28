Feature: Instructor adds folder, remove folder and reorders it 
    @delete-mediaproducer-courses
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources 

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Quantitative Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | courseCode        | E2E 301                      |
            | learningObjective | Principles of Microeconomics |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Quantitative Template" template
            | type                      | activity                                      |
            | addButtonAssessment       | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  About The Authors                            |
            | addButtonReadandpractice  | LCRP1550612138614                             |                         

        And I click on home button to return to coursepage
        And I copy course from the "Quantitative Template" template with the following data
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        | E2E301                       |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Quantitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Quantitative Course" course with following data 
            | field             | value                        |
            | courseName        | Quantitative Course          |
            | courseCode        |  E2E301                      |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Quantitative Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551301608988                                                   |
            | About The Authors                                                 |
            | LCRP1550612138614                                                 |
            
        And I reorder the resources on template in "coursePlanner"
            | actvities                                                         | reorder        |
            | Exercise: Misused words 1 (autoscored)                            | moveToTop      |                                                     
            | LC1551301608988                                                   | movedownButton |
            | About The Authors                                                 | moveToEnd      |
            | LCRP1550612138614                                                 | moveUpButton   |

        Then I verify that resources are reordered in "coursePlanner"
            | activities                                                        | orderNumber    |
            | LCRP1550612138614                                                 |  1             |                                                       
            | Exercise: Misused words 1 (autoscored)                            |  2             |
            | LC1551301608988                                                   |  3             |
            | About The Authors                                                 |  4             |      

        And I add the activities to respective folders in "coursePlanner"
            | activity                                      | folders           | message                                                                             |
            | Exercise: Misused words 1 (autoscored)        | Assesment         | 'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | About The Authors                             | Reading           | 'About The Authors' was successfully moved to Reading.                              |
            | LCRP1550612138614                             | ReadandPractice   | 'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        And I verify the activities are added in folders which are present in "coursePlanner"
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | LC1551301608988                               | Learning Curve    |
            | About The Authors                             | Reading           |
            | LCRP1550612138614                             | ReadandPractice   |

        When I delete the resources from the Template in "coursePlanner"
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Learning Curve    | 'Learning Curve' has been removed.      |
            | Assesment         | 'Assesment' has been removed.           |
            | ReadandPractice   | 'ReadandPractice' has been removed.     |

        Then I verify that resources are deleted from Template in "coursePlanner"
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | Assesment         |
            | ReadandPractice   |



 
        