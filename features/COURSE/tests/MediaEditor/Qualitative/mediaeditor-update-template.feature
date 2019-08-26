@Course @Smoke
Feature: Media Editor is able to create a template and update

   @medieditor-delete-course
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel      | courseName               | learningObjective      | courseCode   | isbnNumber      | courseStatus  |
            | Template    | Qualitative       | Qualitative ME Template  | macmillan calculus     | E2E 327      | 9781464199445   | draft         |                      


        Then I verify that "Qualitative ME Template Created." message is displayed
        And I verify that "Qualitative ME Template" has created with following "ISBN: 9781464199498" number

       And I activate the "Qualitative ME Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Qualitative ME Template   |   E2E 327     |  Active On Date      | 

        Then I verify that "Qualitative ME Template" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative ME Template   |
            | courseDate            |  E2E 327                  |
            | courseShortId         | Template                  |