@Course @Smoke @API
 Feature: Update the Template to Quantitative Template  
     
           
    Scenario: Verify that Media Producer is able to update Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus      |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199490  | Active On Date    |

        Then I verify the details of active Teamplate
            | status | courseName | isbnNumber      |
            | active | randomName | randomNumber    |