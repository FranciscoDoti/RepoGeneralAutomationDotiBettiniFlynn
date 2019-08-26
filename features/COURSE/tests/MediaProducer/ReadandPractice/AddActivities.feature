@Course @Smoke
Feature: Adding activities to the template

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel      | courseName                      |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Read & Practice   | Read & Practice MPA Template    |                  | E2E 357      | 9781464199416  | draft         |                      


        And I activate the "Read & Practice MPA Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Read & Practice MPA Template  |   E2E 357     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice MPA Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | Automation Test                               |     
            | addButtonLearningcurve    | LC1551357608988                               |
            | addReadingButton          |  GLOSSARY                                     |

        Then I verify that activties are added
            | activity                                      |
            | Automation Test                               |    
            | LC1551357608988                               |
            |  GLOSSARY                                     |            