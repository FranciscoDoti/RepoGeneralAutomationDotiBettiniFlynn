@Course @Smoke @psv-458
Feature: Media Editor is able to create a template and update in Quantitative Template

   @mediaeditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Quantitative Template

        Given I login to Achieve-CW as "media_editor_1"
            When I create template with following data 
                | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
                | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   

        Then I verify that "Quantitative Template Created." message is displayed
        And I verify that "Quantitative Template" has created with following "ISBN: 9781464199498" number by Media Editor

       And I activate the "Quantitative Template" template and add the following data as Media Editor
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        Then I verify that "Quantitative Template" is created with following data
            | field                 | value                     |
            | courseName            | Quantitative Template     |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |
        
        When I clone content from "Quant PSV-2877" template

        Then I verify if content was imported successfully with message "Import from 8/15 QL Template was successful.."