@Course @Smoke @psv-458
Feature: Media Editor is able to create a template and update in Quantitative Template

   @mediaeditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Quantitative Template

        Given I login to Achieve-CW as "media_editor_1"
            When I create template with following data 
                | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
                | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   

        Then I verify that "Quantitative Template Created." message is displayed
        And I verify that "Quantitative Template" has created with following "9781464199498" ISBN number

       And I update "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        Then I verify that "Quantitative Template" is activated with following data
            | CourseName                | Status                    | ISBN                      |
            | Quantitative Template     |  Active                   |  9781464199498            |
