@Course @Smoke
Feature: Adding activities in Folder courseplanner

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add folder in courseplanner

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName                 | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative MPF Template  | Principles of Microeconomics      | E2E 350      | 9781464199422  | draft         |   

        And I activate the "Quantitative MPF Template" template and add the following data
            | courseName                 |  courseCode   |  templateStatus      |
            | Quantitative MPF Template  |   E2E 350     |  Active On Date      | 


        And I add the activities in resources to "Quantitative MPF Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         |  Glossary                                     |
            | addButtonReadandpractice | Automation Test                               |


        And I add the activities in "COURSE PLAN"
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551301608988                                                   |
            | Glossary                                                          |
            | Automation Test                                                   |


        And I reorder the resources on template in "COURSE PLAN"
            | actvities                                                         | reorder        |
            | Exercise: Misused words 1 (autoscored)                            | moveToTop      |                                                     
            | LC1551301608988                                                   | movedownButton |
            | Glossary                                                          | moveToEnd      |
            | Automation Test                                                   | moveUpButton   |

        Then I verify that resources are reordered in "COURSE PLAN"
            | activities                                                        | orderNumber    |
            | Automation Test                                                   |  1             |                                                       
            | Exercise: Misused words 1 (autoscored)                            |  2             |
            | LC1551301608988                                                   |  3             |
            | Glossary                                                          |  4             |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           | message                                                                             |
            | Exercise: Misused words 1 (autoscored)        | Assesment         | 'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | Glossary                                      | Reading           | 'Glossary' was successfully moved to Reading.                                       |
            | Automation Test                               | ReadandPractice   | 'Automation Test' was successfully moved to ReadandPractice.                      |

        And I verify the activities are added in folders which are present in "COURSE PLAN"
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | LC1551301608988                               | Learning Curve    |
            | Glossary                                      |  Reading          |
            | Automation Test                               | ReadandPractice   |

        When I delete the resources from the Template in "COURSE PLAN"
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Learning Curve    | 'Learning Curve' has been removed.      |
            | Assesment         | 'Assesment' has been removed.           |
            | ReadandPractice   | 'ReadandPractice' has been removed.     |

        Then I verify that resources are deleted from Template in "COURSE PLAN"
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | Assesment         |
            | ReadandPractice   |