@Course @Smoke
Feature: Adding activities to Read & Practice template

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Media Producer is able to add activities to Read & Practice template

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

        Then I verify that activties are added in "Content Library"
            | activity                                      |
            | LCRP1550612138614                             |    
            | LC1551301608988                               |
            |  GLOSSARY                                     |            