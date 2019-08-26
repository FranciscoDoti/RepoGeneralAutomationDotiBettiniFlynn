@Course @Smoke
Feature: Create course

    @mediaproducer-delete-course
    Scenario:  Create course Template for Qualitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName               | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative MPCTemplate  | macmillan calculus     | E2E 338      | 9781464199433  | draft         |                      


        Then I verify that "Qualitative MPCTemplate Created." message is displayed
        And I verify that "Qualitative MPCTemplate" has created with following "ISBN: 9781464199433" number

    
