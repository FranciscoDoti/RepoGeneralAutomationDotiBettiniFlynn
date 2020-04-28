@Course @Smoke
 Feature: Update Read & Practice template  
     
     @mediaproducer-delete-courseTemplate         
    Scenario: Verify that Media Producer is able to update Read & Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus           |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199490  | Active On Date         |

        Then I verify the details of active Teamplate
            | status | courseName | isbnNumber      |
            | active | randomName | randomNumber    |
        
        