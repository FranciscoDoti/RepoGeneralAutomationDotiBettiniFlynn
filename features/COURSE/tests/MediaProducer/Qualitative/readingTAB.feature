@Course @Smoke
Feature: Adding reading activities in reading tab to Qualitative template

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that media Producer is able to add activities, create folder, reorder and delete content in reading tab to Qualitative template

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
            | addReadingButton         | Glossary                                      |
            | addReadingButton         |  Psychopathology                              |
            | addReadingButton         | Literary Elements                             |


        And I add the activities in ebook
            | activity                                      |                                                      
            | Psychopathology                               | 
            | Literary Elements                             |
            | Glossary                                      | 
          

        And I reorder the resources on template in ebook
            | actvities                                                         | reorder        |
            |  Psychopathology                                                  | moveToTop      |                                                     
            | Literary Elements                                                 | movedownButton |
            | Glossary                                                          | moveToEnd      |


        Then I verify that resources are reordered in ebook
            | activities                    |   orderNumber   |                                                    
            |  Psychopathology              |   1             |
            | Literary Elements             |   2             |
            | Glossary                      |   3             |                                                                                                                               
                                                                                    

        And I add the activities to respective folders in ebook
            | activity                                      | folders               |                                                               
            | Literary Elements                             | Reading Regression    | 
            | Glossary                                      | Reading Interval      |
            | Psychopathology                               | Reading Symbols       |
           

        And I verify the activities are added in folders which are present in "E-book"
            | activity                                     | folders               |
            | Psychopathology                              | Reading Symbols       |
            | Literary Elements                            | Reading Regression    |
            | Glossary                                     | Reading Interval      |
         

        When I delete the resources from the Template in ebook
            | folders               | message                                  |
            | Reading Interval      | 'Reading Interval' has been removed.     |
            | Reading Regression    | 'Reading Regression' has been removed.   |
            | Reading Symbols       | 'Reading Symbols' has been removed.      |

        Then I verify that resources are deleted from Template in "E-book"
            | folders                   |  
            | Reading Interval          |
            | Reading Regression        |
            | Reading Symbols           |