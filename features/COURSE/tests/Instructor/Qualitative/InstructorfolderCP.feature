@Course @Smoke
Feature: Instructor adds folder, remove folder and reorders it in Qualitative Course

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources in Qualitative Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Template" template
            | type                      | activity                                      |
            | addButtonAssessment       | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  Glossary                                   |
            | addButtonReadandpractice  | LCRP1550612138614                             |                         

        And I click on home button to return to coursepage
        And I copy course from the "Qualitative Template" template with the following data
            | courseName          | courseCode           |
            | Qualitative Course  | E2E 301              |


        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Qualitative Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Qualitative Course" course with following data 
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Qualitative Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LC1551301608988                                                   |
            | Glossary                                                        |
            | LCRP1550612138614                                                 |
            
        And I reorder the resources on template in "COURSE PLAN"
            | actvities                                                         | reorder        |
            | Exercise: Misused words 1 (autoscored)                            | moveToTop      |                                                     
            | LC1551301608988                                                   | movedownButton |
            | Glossary                                                        | moveToEnd      |
            | LCRP1550612138614                                                 | moveUpButton   |

        Then I verify that resources are reordered in "COURSE PLAN"
            | activities                                                        | orderNumber    |
            | LCRP1550612138614                                                 |  1             |                                                       
            | Exercise: Misused words 1 (autoscored)                            |  2             |
            | LC1551301608988                                                   |  3             |
            | Glossary                                                        |  4             |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           | message                                                                             |
            | Exercise: Misused words 1 (autoscored)        | Assesment         | 'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | Glossary                                    | Reading           | 'Glossary' was successfully moved to Reading.                              |
            | LCRP1550612138614                             | ReadandPractice   | 'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        And I verify the activities are added in folders which are present in "COURSE PLAN"
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | LC1551301608988                               | Learning Curve    |
            | Glossary                                    | Reading           |
            | LCRP1550612138614                             | ReadandPractice   |

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



 
        