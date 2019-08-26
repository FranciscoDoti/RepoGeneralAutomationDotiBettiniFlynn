@Course @Smoke
Feature: Media Editor is able to create a template and update

   @medieditor-delete-course
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
            When I create template with following data 
                | courseType  | productModel       | courseName                | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
                | Template    | Quantitative       | Quantitative ME Template  | Principles of Microeconomics      | E2E 329      | 9781464199443  | draft         |   

        Then I verify that "Quantitative ME Template Created." message is displayed
        And I verify that "Quantitative ME Template" has created with following "ISBN: 9781464199498" number

       And I activate the "Quantitative ME Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Quantitative ME Template  |   E2E 329     |  Active On Date      | 


        Then I verify that "Quantitative ME Template" is created with following data
            | field                 | value                     |
            | courseName            | Quantitative ME Template  |
            | courseDate            |  E2E 329                  |
            | courseShortId         | Template                  |