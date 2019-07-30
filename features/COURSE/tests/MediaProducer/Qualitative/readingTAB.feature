@Course @Smoke
Feature: Adding reading activities in reading tab 

    @mediaproducer-delete-course
    Scenario: Verify that media Producer is able to add activities, create folder, reorder and delete content in reading tab

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | Analyzing Drama                               |
            | addReadingButton         |  Analyzing Literary Elements                  |
            | addReadingButton         | Literary Elements                             |
            | addReadingButton         | Dedication                                    |

        And I add the activities in ebook
            | activity                                      |                                                      
            | Analyzing Literary Elements                   | 
            | Literary Elements                             |
            | Analyzing Drama                               | 
            | Dedication                                    | 

        And I reorder the resources on template in "E-book"
            | actvities                                                         | reorder        |
            |  Analyzing Literary Elements                                      | moveToTop      |                                                     
            | Literary Elements                                                 | movedownButton |
            | Analyzing Drama                                                   | moveToEnd      |
            | Dedication                                                        | moveUpButton   |

        Then I verify that resources are reordered in ebook
            | activities                    |   orderNumber   |
            | Dedication                    |   1             |                                                     
            |  Analyzing Literary Elements  |   2             |
            | Literary Elements             |     3           |                                                                                         
            | Analyzing Drama               |   4             |                                        
                                                                                    

        And I add the activities to respective folders in ebook
            | activity                                      | folders               | message                                                                   |
            |  Analyzing Literary Elements                  | Reading Symbols       | 'Analyzing Literary Elements' was successfully moved to Reading Symbols.  |
            | Literary Elements                             | Reading Regression    | 'Literary Elements' was successfully moved to Reading Regression.         |
            | Dedication                                    | Reading Interval      | 'Dedication' was successfully moved to Reading Interval.                  |
            | Analyzing Drama                               | Reading Authors       | 'Analyzing Drama' was successfully moved to Reading Authors.              |

        And I verify the activities are added in folders which are present in "E-book"
            | activity                                      | folders               |
            |  Analyzing Literary Elements                   | Reading Symbols       |
            |  Literary Elements                            | Reading Regression    |
            | Analyzing Drama                               | Reading Authors       |
            |  Dedication                                   | Reading Interval      |

        When I delete the resources from the Template in ebook
            | folders               | message                                  |
            | Reading Authors       | 'Reading Authors' has been removed.      |
            | Reading Interval      | 'Reading Interval' has been removed.     |
            | Reading Regression    | 'Reading Regression' has been removed.   |
            | Reading Symbols       | 'Reading Symbols' has been removed.      |

        Then I verify that resources are deleted from Template in "E-book"
            | folders                   |
            | Reading Authors           |  
            | Reading Interval          |
            | Reading Regression        |
            | Reading Symbols           |