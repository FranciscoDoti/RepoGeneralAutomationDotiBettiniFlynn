@Course @Smoke
Feature: Media Editor is able to create a template and update in Quantitative Template

   @mediaeditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Quantitative Template

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel      | courseName                        | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative      | Automation Quantitative Template  | macmillan calculus     | E2E 301      | 9781464199490  | draft         |                                           
        
        Then I verify that "Automation Quantitative Template Created." message is displayed
        And I verify that "Automation Quantitative Template" has created with following "9781464199490" ISBN number by Media editor

        When I activate the "Automation Quantitative Template" template and add the following data
            | courseName                       |  courseCode   |  templateStatus      |
            |Automation Quantitative Template  |   E2E 301     |  Active On Date      |


        Then I verify that "Automation Quantitative Template" is activated with following data
            | CourseName                           | Status                    | ISBN                      |
            | Automation Quantitative Template     |  Active                   |  9781464199490            |
