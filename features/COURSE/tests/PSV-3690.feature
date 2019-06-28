Feature: Adding reading activities in reading tab 

    @delete-mediaproducer-courses
    Scenario: Verify that media Producer is able to add activities, create folder, reorder and delete content in reading tab

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Quantitative Template" with the data 
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
            | addReadingButton         | About The Authors                             |
            | addReadingButton         | SYMBOLS AND NOTATION                          |
            | addReadingButton         | Regression and Error                          |
            | addReadingButton         | Confidence Intervals                          |

        And I add the activities in "ebook"
            | activity                                      | 
            | About The Authors                             |
            | SYMBOLS AND NOTATION                          |
            | Regression and Error                          |
            | Confidence Intervals                          |
            

        And I reorder the resources on template in "ebook"
            | actvities                                                         | reorder        |
            | SYMBOLS AND NOTATION                                              | moveToTop      |                                                     
            | Regression and Error                                              | movedownButton |
            | About The Authors                                                 | moveToEnd      |
            | Confidence Intervals                                              | moveUpButton   |

        Then I verify that resources are reordered in ebook
            | activities                 |   orderNumber   |
            | Confidence Intervals       |   1             |                                                     
            | SYMBOLS AND NOTATION       |   2             |
            | Regression and Error       |   3             |                                                                                         
            | About The Authors          |   4             |                                        
                                                                                    

        And I add the activities to respective folders in ebook
            | activity                                      | folders               | message                                                                  |
            | SYMBOLS AND NOTATION                          | Reading Symbols       | 'SYMBOLS AND NOTATION' was successfully moved to Reading Symbols.       |
            | Regression and Error                          | Reading Regression    | 'Regression and Error' was successfully moved to Reading Regression.     |
            | Confidence Intervals                          | Reading Interval      | 'Confidence Intervals' was successfully moved to Reading Interval.      |
            | About The Authors                             | Reading Authors       | 'About The Authors' was successfully moved to Reading Authors.           |

        And I verify the activities are added in folders which are present in "ebook"
            | activity                                      | folders               |
            | SYMBOLS AND NOTATION                          | Reading Symbols       |
            |  Regression and Error                         | Reading Regression    |
            | About The Authors                             | Reading Authors       |
            |  Confidence Intervals                         | Reading Interval      |

        When I delete the resources from the Template in ebook
            | folders               | message                                  |
            | Reading Authors       | 'Reading Authors' has been removed.      |
            | Reading Interval      | 'Reading Interval' has been removed.     |
            | Reading Regression    | 'Reading Regression' has been removed.   |
            | Reading Symbols       | 'Reading Symbols' has been removed.     |

        Then I verify that resources are deleted from Template in "ebook"
            | folders                   |
            | Reading Authors           |  
            | Reading Interval          |
            | Reading Regression        |
            | Reading Symbols           |