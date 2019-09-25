@Course @Smoke
Feature: Media Editor is able to create a template and update Qualitative Template

   @medieditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Qualitative Template

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        Then I verify that "Qualitative Template Created." message is displayed
        And I verify that "Qualitative Template" has created with following "9781464199498" number

       And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        Then I verify that "Qualitative Template" is created with following data
            | field                 | value                     |
            | courseName            | Qualitative Template      |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |
        
        When I clone content from "8/15 QL Template" template
            | field                 | value                     |
            | courseName            | 8/15 QL Template          |
        
        Then I verify if content was imported successfully