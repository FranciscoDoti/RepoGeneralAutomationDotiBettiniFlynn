@Course @Smoke
Feature: Media Editor is able to create a template and update in Read & Practice Template

   @mediaeditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Read & Practice Template

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel      | courseName                             |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Automation Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      

        Then I verify that "Automation Read & Practice Template Created." message is displayed
        When I search for "Automation Read & Practice Template" course
        Then I verify that "Automation Read & Practice Template" has created with following "9781464199498" ISBN number by Media editor

        When I activate the "Automation Read & Practice Template" template and add the following data
            | courseName                           |  courseCode   |  templateStatus      |
            | Automation Read & Practice Template  |   E2E 301     |  Active On Date      |                       
 

        Then I verify that "Automation Read & Practice Template" is activated with following data
            | CourseName                           | Status                    | ISBN                      |
            | Automation Read & Practice Template  |  Active                   | 9781464199498             |
