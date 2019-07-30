@Course @Smoke
Feature: Media Editor is able to create a template and update

   @medieditor-delete-course
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      

        Then I verify that "Read & Practice Template Created." message is displayed
        And I verify that "Read & Practice Template" has created with following "ISBN: 9781464199499" number

       And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 

        Then I verify that "Read & Practice Template" is created with following data
            | field                 | value                     |
            | courseName            | Read & Practice Template  |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |