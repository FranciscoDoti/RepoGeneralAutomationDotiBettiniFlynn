@Course @Smoke
Feature: Media Editor is able to create a template and update

   @delete-mediaEditor-9781464199499
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel | courseName       | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  | Principles of Microeconomics      | E2E 301      | 9781464199498 | draft         |   

        Then I verify that "Quantitative Template Created." message is displayed
        And I verify that "Quantitative Template" has created with following "ISBN: 9781464199499" number

       And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        Then I verify that "Quantitative Template" is created with following data
            | field                 | value                     |
            | courseName            | Quantitative Template     |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |