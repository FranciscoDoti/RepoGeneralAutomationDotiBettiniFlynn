@Course @Smoke
 Feature: Update the Template   
     
    @mediaproducer-delete-course       
    Scenario: Verify that Media Producer is able to update the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName                  | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative MPUC Template  | Principles of Microeconomics      | E2E 353      | 9781464199419  | draft         |  

        And I activate the "Quantitative MPUC Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Quantitative MPUC Template    |   E2E 353     |  Active On Date      | 

            
        Then I verify that "Quantitative MPUC Template" is created with following data
            | field                 | value                          |
            | courseName            | Quantitative MPUC Template     |
            | courseDate            |  E2E 353                       |
            | courseShortId         | Template                       |