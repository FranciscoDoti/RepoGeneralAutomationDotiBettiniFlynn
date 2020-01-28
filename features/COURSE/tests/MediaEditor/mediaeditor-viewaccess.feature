@Course @Smoke
Feature: Media Editor has only view access that they are not a collaborator

     @mediaproducer-delete-courseTemplate
    Scenario: Verify that Media Editor has only view access that they are not collaborator

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   

        And I close the popup message                      

        And I click on search button and input "Quantitative Template" to search the course     

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                             |
          | Glossary                               |
          | Exercise: Misused words 1 (autoscored) |

        And I sign out of Achieve

        And I login to Achieve-CW as "media_editor_1"

        Then I verify that media editor has only view access to "Quantitative Template"
        
