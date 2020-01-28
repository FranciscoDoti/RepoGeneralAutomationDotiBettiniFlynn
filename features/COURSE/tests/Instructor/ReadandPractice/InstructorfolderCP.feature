@Course @Smoke
Feature: Instructor adds folder, remove folder and reorders it in Read & Practice Template

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources in Read & Practice Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      
        And I close the popup message                      

        And I click on search button and input "Read & Practice Template" to search the course
        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      |                       

        And I click on "Read & Practice Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          | LC1551301608988       |
          
        And I click on back to course
        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 

        And I copy course from the "Read & Practice Template" template with the following data
            | courseName              | courseCode           |
            | Read & Practice Course  | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Read & Practice Course" course
        
        And I sign out of Achieve
        And I login to Achieve-CW as "instructor_1"

        When I activate "Read & Practice Course" course with following data 
            | field             | value                        |
            | courseName        | Read & Practice Course       |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |
     
        And I add activities in "Read & Practice Course" courseplanner tab
            | activity                                                          |                                                        
            | LC1551301608988                                                   |
            | Glossary                                                          |
            | LCRP1550612138614                                                 |
        And I close the popup message
            
        And I reorder the resources on template in "COURSE PLAN"
            | actvities                                                         | reorder        |                                                    
            | LC1551301608988                                                   | movedownButton |
            | Glossary                                                          | moveToEnd      |
            | LCRP1550612138614                                                 | moveUpButton   |

        Then I verify that resources are reordered in "COURSE PLAN"
            | activities                                                        | orderNumber    |
            | LCRP1550612138614                                                 |  1             |                                                       
            | LC1551301608988                                                   |  2             |
            | Glossary                                                          |  3             |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           | folderName                | message                                                                             |
            | LC1551301608988                               | Learning Curve    | Learning Curve folder     | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | Glossary                                      | Reading           | Reading folder            | 'Glossary' was successfully moved to Reading.                                     |
            | LCRP1550612138614                             | ReadandPractice   | ReadandPractice folder    | 'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        And I verify the activities are added in folders which are present in "COURSE PLAN"
            | activity                                      | folders           |
            | LC1551301608988                               | Learning Curve    |
            | Glossary                                      | Reading           |
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



 
        