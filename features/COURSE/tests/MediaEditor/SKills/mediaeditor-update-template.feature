@Course @Smoke
Feature: Media Editor is able to create a template and update

   @delete-mediaEditor-9781464199499
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
        When I create "Skills Template" Template with following data 
            | courseType  | productModel | courseName       | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  | E2E 301      | 9781464199498 | draft         |                      


        Then I verify that "Skills Template Created." message is displayed
        And I verify that "Skills Template" has created with following "ISBN: 9781464199499" number

       And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        Then I verify that "Skills Template" is created with following data
            | field                 | value                     |
            | courseName            | Skills Template           |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |