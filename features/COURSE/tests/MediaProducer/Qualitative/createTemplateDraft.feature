@Course @Smoke @flak
Feature: Create course Qualitative
 
    @mediaproducer-delete-courseTemplate
    Scenario:  Create course Template for Qualitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus           |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199490  | Draft                  |                      


        Then I verify that template is created with following data
            | status | courseName | isbnNumber      |
            | draft  | randomName | randomNumber    |

    
