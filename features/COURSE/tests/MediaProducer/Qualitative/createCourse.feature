@Course @Smoke @flak
Feature: Create course Qualitative 

    Scenario:  Create course Template for Qualitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus           |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199490  | Active On Date         |                      


        Then I verify that template is created with following data
            | status | courseName | isbnNumber      |
            | active | randomName | randomNumber    |

    
