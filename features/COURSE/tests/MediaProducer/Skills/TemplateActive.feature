 @Course @Smoke @API
 Feature: Update Skills Production Template  
              
    Scenario: Verify that Media Producer is able to update Skills Production Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                   |learningObjective | courseCode   | isbnNumber     | courseStatus           |
            | Template    | Skills       | Skills Production Template  |                   | E2E 301      | 9781464199490  | Active On Date         |                      

        Then I verify the details of active Teamplate
            | status | courseName | isbnNumber      |
            | active | randomName | randomNumber    |
        