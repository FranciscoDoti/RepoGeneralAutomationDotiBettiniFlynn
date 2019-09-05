@Course @Smoke
Feature: Adding activities in Folder courseplanner to Skills template

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add folder in courseplanner to Skills template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        And I add the activities in resources to "Skills Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         |  GLOSSARY                                     |
            | addButtonReadandpractice | LCRP1550612138614                             |


        And I add the activities in "COURSE PLAN"
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
            | GLOSSARY                                                          |  43            |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           | message                                                                             |
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