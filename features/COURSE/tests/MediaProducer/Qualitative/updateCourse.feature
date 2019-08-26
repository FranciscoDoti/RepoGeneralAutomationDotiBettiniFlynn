 @Course @Smoke
 Feature: Update the Template   
     
    @mediaproducer-delete-course       
    Scenario: Verify that Media Producer is able to update the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                 | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative MPUC Template  | macmillan calculus     | E2E 343      | 9781464199428  | draft         |                      

        And I activate the "Qualitative MPUC Template" template and add the following data
            | courseName                  |  courseCode   |  templateStatus      |
            | Qualitative MPUC Template   |   E2E 343     |  Active On Date      | 
            
        Then I verify that "Qualitative MPUC Template" is created with following data
            | field                 | value                         |
            | courseName            | Qualitative MPUC Template     |
            | courseDate            |  E2E 343                      |
            | courseShortId         | Template                      |