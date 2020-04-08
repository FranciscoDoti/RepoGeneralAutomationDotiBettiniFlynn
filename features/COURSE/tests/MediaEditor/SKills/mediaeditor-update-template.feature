@Course @Smoke
Feature: Media Editor is able to create a template and update in SKills Template

   @mediaeditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Skills Template

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
           | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Automation Skills Template  |                  | E2E 301      | 9781464199490  | draft         | 
                      

        Then I verify that "Automation Skills Template Created." message is displayed
        And I verify that "Automation Skills Template" has created with following "9781464199490" ISBN number by Media editor

        When I activate the "Automation Skills Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Automation Skills Template    |   E2E 301     |  Active On Date      | 

        Then I verify that "Automation Skills Template" is activated with following data
            | CourseName                       | Status                    | ISBN                      |
            | Automation Skills Template       |  Active                   |  9781464199490            |
