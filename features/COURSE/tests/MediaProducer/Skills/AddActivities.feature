@Course @Smoke
Feature: Adding activities to Skills Production Template

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Media Producer is able to add activities to Skills Production Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Production Template  |                  | E2E 301      | 9781464199498  | draft         |                     

         And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course
        And I activate the "Skills Production Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills Production Template    |   E2E 301     |  Active On Date      |                         

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LC1551301608988       |

        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | LC1551301608988                               |
            |  GLOSSARY                                     |            