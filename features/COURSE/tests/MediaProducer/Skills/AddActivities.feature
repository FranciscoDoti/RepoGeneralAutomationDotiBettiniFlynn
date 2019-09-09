@Course @Smoke
Feature: Adding activities to Skills template

    @mediaproducer-delete-course
    Scenario: Verify that Media Producer is able to add activities to Skills template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                     

        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        And I add the activities in resources to "Skills Template" template
            | type                    | activity                                      |    
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  GLOSSARY                                     |

        Then I verify that activties are added
            | activity                                      |    
            | LC1551301608988                               |
            |  GLOSSARY                                     |            