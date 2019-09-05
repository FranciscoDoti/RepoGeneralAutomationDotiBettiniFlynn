@Course @Smoke
Feature: Adding activities in Folder Resource Tab to Skills template
    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities in folder present in resource tab to Skills template

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

        And I add the following activities to respective folders in resource tab
            | activity                                      | folders           | message                                                                             |
            | LC1551301608988                               | Learning Curve    | 'LC1551301608988' was successfully moved to Learning Curve.                         |
            | GLOSSARY                                      | Reading           | 'GLOSSARY' was successfully moved to Reading.                                       |
            | LCRP1550612138614                             | ReadandPractice   | 'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        When I reorder the resources on template
            | folders           | reorder        |
            | Reading           | moveToTop      |
            | Learning Curve    | movedownButton |
            | ReadandPractice   | moveUpButton   |

        Then I verify that resources are reordered
            | folders         | orderNumber |
            | ReadandPractice | 1           |
            | Reading         | 2           |
            | Learning Curve  | 3           |


        And I verify the following activities are present in folders
            | activity                                      | folders           |
            | LC1551301608988                               | Learning Curve    |
            | GLOSSARY                                      | Reading           |
            | LCRP1550612138614                             | ReadandPractice   |

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







    
    