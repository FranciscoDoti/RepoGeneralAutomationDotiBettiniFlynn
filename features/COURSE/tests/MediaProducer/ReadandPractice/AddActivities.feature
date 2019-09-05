@Course @Smoke
Feature: Adding activities to Read& Practice template

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities to Read& Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice Template" template
            | type                    | activity                                      |
            | addButtonReadandpractice | LCRP1550612138614                            |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        Then I verify that activties are added
            | activity                                      |
            | LCRP1550612138614                             |    
            | LC1551301608988                               |
            |  GLOSSARY                                     |            