@Course @Smoke
Feature: Adding activities to Quantitative Template

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that Media Producer is able to add activities to Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   
            

        And I close the popup message                      

        And I click on search button and input "Quantitative Template" to search the course     

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                |
          | Glossary                                  |
          | Exercise: Misused words 1 (autoscored)    |
          | LC1551301608988                           |

        Then I verify that activties are added in "Content Library"
            | activity                                      |
            | Exercise: Misused words 1 (autoscored)        |     
            | LC1551301608988                               |
            |  Glossary                                     |            