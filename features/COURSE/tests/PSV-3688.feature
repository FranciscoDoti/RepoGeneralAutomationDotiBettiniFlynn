Feature: Adding activities in Folder Resource Tab
    @delete-mediaproducer-courses
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
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         |  About The Authors                            |
            | addButtonReadandpractice | LCRP1550612138614                             |

        And I add folders in resource tab
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | Assesment         |
            | ReadandPractice   |

        And I add the activities to respective folders
            | activity                                      | folders           | message                                                                             |
            | Exercise: Misused words 1 (autoscored)        | Assesment         | 'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | About The Authors                             | Reading           | 'About The Authors' was successfully moved to Reading.                              |
            | LCRP1550612138614                             | ReadandPractice   | 'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        When I reorder the resources on template
            | folders           | reorder        |
            | Reading           | moveToTop      |
            | Learning Curve    | movedownButton |
            | Assesment         | moveToEnd      |
            | ReadandPractice   | moveUpButton   |

        Then I verify the activities are added in folders
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | LC1551301608988                               | Learning Curve    |
            | About The Authors                             | Reading           |
            | LCRP1550612138614                             | ReadandPractice   |

        When I delete the resources from the Template
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | Assesment         |
            | ReadandPractice   |

        Then I verify that resources are deleted from Template 
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | Assesment         |
            | ReadandPractice   |







    
    