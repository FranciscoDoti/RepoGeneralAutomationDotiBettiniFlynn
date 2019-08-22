@Course @Smoke
Feature: Adding activities in Folder Resource Tab
    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities in folder present in resource tab

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber    | courseStatus  |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498 | draft         |   

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I add the activities in resources to "Quantitative Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         |  Glossary                                     |       
            | addButtonReadandpractice | Automation Test                               |

        And I add the following activities to respective folders in resource tab
            | activity                                      | folders           | message                                                                             |
            | Exercise: Misused words 1 (autoscored)        | Assesment         | 'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | Glossary                                      | Reading           | 'Glossary' was successfully moved to Reading.                                       |
            | Automation Test                               | ReadandPractice   | 'Automation Test' was successfully moved to ReadandPractice.                      |

        When I reorder the resources on template
            | folders           | reorder        |
            | Reading           | moveToTop      |
            | Learning Curve    | movedownButton |
            | Assesment         | moveToEnd      |
            | ReadandPractice   | moveUpButton   |

        Then I verify that resources are reordered
            | folders         | orderNumber |
            | ReadandPractice | 1           |
            | Reading         | 2           |
            | Learning Curve  | 3           |
            | Assesment       | 4           |


        And I verify the following activities are present in folders
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | LC1551301608988                               | Learning Curve    |
            | Glossary                                      | Reading           |
            | Automation Test                               | ReadandPractice   |

        When I delete the following resources from the Template
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Learning Curve    | 'Learning Curve' has been removed.      |
            | Assesment         | 'Assesment' has been removed.           |
            | ReadandPractice   | 'ReadandPractice' has been removed.     |

        Then I verify that the following resources are not present in the Template 
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | Assesment         |
            | ReadandPractice   |







    
    