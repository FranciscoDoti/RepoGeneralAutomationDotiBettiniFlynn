@Course @Smoke
Feature: Media Editor is able to create a template and update Qualitative Template

   @mediaeditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Qualitative Template

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        Then I verify that "Qualitative Template Created." message is displayed
        And I verify that "Qualitative Template" has created with following "9781464199498" ISBN number

       When I update "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        Then I verify that "Qualitative Template" is activated with following data
            | CourseName            | Status                    | ISBN                      |
            | Qualitative Template  |  Active                   | 9781464199498             |
