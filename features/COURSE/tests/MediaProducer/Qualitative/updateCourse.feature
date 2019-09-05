 @Course @Smoke
 Feature: Update Qaulitative template  
     
    @mediaproducer-delete-course       
    Scenario: Verify that Media Producer is able to update Qaulitative template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 
            
        Then I verify that "Qualitative Template" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative Template      |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |