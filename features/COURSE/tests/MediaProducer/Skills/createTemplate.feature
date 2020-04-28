
@Course @Smoke
Feature: Create course Skills template

    @mediaproducer-delete-courseTemplate
    Scenario:  Create course Template for Skills

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199490  | draft         |                      

        Then I verify that template is created with following data
            | status | courseName | isbnNumber      |
            | draft  | randomName | randomNumber    |

    
