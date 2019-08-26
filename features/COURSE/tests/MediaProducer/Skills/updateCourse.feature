 @Course @Smoke
 Feature: Update the Template   
     
    @mediaproducer-delete-course       
    Scenario: Verify that Media Producer is able to update the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills MPUC Template  |                  | E2E 370      | 9781464199401  | draft         |                      

        And I activate the "Skills MPUC Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills MPUC Template      |   E2E 370     |  Active On Date      |
            
        Then I verify that "Skills MPUC Template" is created with following data
            | field                 | value                     |
            | courseName            | Skills MPUC Template      |
            | courseDate            |  E2E 370                  |
            | courseShortId         | Template                  |