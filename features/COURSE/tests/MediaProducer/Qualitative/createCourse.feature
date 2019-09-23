@Course @Smoke
Feature: Create course Qualitative 

    @mediaproducer-delete-courseTemplate
    Scenario:  Create course Template for Qualitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        Then I verify that "Qualitative Template Created." message is displayed
        And I verify that "Qualitative Template" has created with following "9781464199498" number

    
