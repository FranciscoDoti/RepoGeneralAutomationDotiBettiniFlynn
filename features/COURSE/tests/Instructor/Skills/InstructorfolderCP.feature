@Course @Smoke
Feature: Instructor adds folder, remove folder and reorders it in Skills Course 

    @mediaproducer-delete-course
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources in Skills Course

        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        And I add the activities in resources to "Skills Template" template
            | type                      | activity                                      |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  GLOSSARY                                     |
            | addButtonReadandpractice  | LCRP1550612138614                             |                         

        And I click on home button to return to coursepage
        And I copy course from the "Skills Template" template with the following data
            | courseName          | courseCode           |
            | Skills Course       | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Skills Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Skills Course" course with following data 
            | field             | value                        |
            | courseName        | Skills Course                |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
     
        And I add the activities in courseplanner to "Skills Course" course
            | activity                                                          |                                                        
            | LC1551301608988                                                   |
            | GLOSSARY                                                          |
            | LCRP1550612138614                                                 |
            
        And I reorder the resources on template in "COURSE PLAN"
            | actvities                                                         | reorder        |                                                    
            | LC1551301608988                                                   | movedownButton |
            | GLOSSARY                                                          | moveToEnd      |
            | LCRP1550612138614                                                 | moveUpButton   |

        Then I verify that resources are reordered in "COURSE PLAN"
            | activities                                                        | orderNumber    |
            | LCRP1550612138614                                                 |  1             |                                                       
            | LC1551301608988                                                   |  2             |
            | GLOSSARY                                                          |  3             |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           | message                                                                             
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | GLOSSARY                                      | Reading           | 'GLOSSARY' was successfully moved to Reading.                                       |
            | LCRP1550612138614                             | ReadandPractice   | 'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        And I verify the activities are added in folders which are present in "COURSE PLAN"
            | activity                                      | folders           |
            | LC1551301608988                               | Learning Curve    |
            | GLOSSARY                                      | Reading           |
            | LCRP1550612138614                             | ReadandPractice   |

        When I delete the resources from the Template in "COURSE PLAN"
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Learning Curve    | 'Learning Curve' has been removed.      |
            | ReadandPractice   | 'ReadandPractice' has been removed.     |

        Then I verify that resources are deleted from Template in "COURSE PLAN"
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | ReadandPractice   |



 
        