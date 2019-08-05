@Course @Smoke
Feature: Adding reading activities in reading tab 

    @mediaproducer-delete-course
    Scenario: Verify that media Producer is able to add activities, create folder, reorder and delete content in reading tab

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                     


        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        And I add the activities in resources to "Skills Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | GLOSSARY                                      |
            | addReadingButton         |  Appendix F                                   |
            | addReadingButton         | Regression and Error                          |
            | addReadingButton         | Confidence Intervals                          |

        And I add the activities in ebook
            | activity                                      | 
            | GLOSSARY                                      |
            |  Appendix F                                   |
            | Regression and Error                          |
            | Confidence Intervals                          |
            

        And I reorder the resources on template in ebook
            | actvities                                                         | reorder        |
            |  Appendix F                                                       | moveToTop      |                                                     
            | Regression and Error                                              | movedownButton |
            | GLOSSARY                                                          |  moveToEnd     |
            | Confidence Intervals                                              | moveUpButton   |

        Then I verify that resources are reordered in ebook
            | activities                 |   orderNumber   |
            | Confidence Intervals       |   1             |                                                     
            |  Appendix F                |   2             |
            | Regression and Error       |   3             |                                                                                         
            | GLOSSARY                   |   4             |                                        
                                                                                    

        And I add the activities to respective folders in ebook
            | activity                                      | folders               | message                                                                  |    
            |  Appendix F                                   | Reading Symbols       | 'Appendix F' was successfully moved to Reading Symbols.                  |
            | Regression and Error                          | Reading Regression    | 'Regression and Error' was successfully moved to Reading Regression.     |
            | Confidence Intervals                          | Reading Interval      | 'Confidence Intervals' was successfully moved to Reading Interval.       |
            | GLOSSARY                                      | Reading Authors       | 'GLOSSARY' was successfully moved to Reading Authors.                    |

        And I verify the activities are added in folders which are present in "E-book"
            | activity                                      | folders               |
            |  Appendix F                                   | Reading Symbols       |
            |  Regression and Error                         | Reading Regression    |
            | GLOSSARY                                      | Reading Authors       |
            |  Confidence Intervals                         | Reading Interval      |

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