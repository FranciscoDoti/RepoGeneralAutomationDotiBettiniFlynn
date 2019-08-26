@Course @Smoke
Feature: Media Editor is able to create a template and update

   @medieditor-delete-course
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
           | courseType  | productModel | courseName          |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills ME Template  |                  | E2E 333      | 9781464199439  | draft         |                      


        Then I verify that "Skills ME Template Created." message is displayed
        And I verify that "Skills ME Template" has created with following "ISBN: 9781464199498" number

       And I activate the "Skills ME Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills ME Template        |   E2E 333     |  Active On Date      |

        Then I verify that "Skills ME Template" is created with following data
            | field                 | value                     |
            | courseName            | Skills ME Template        |
            | courseDate            |  E2E 333                  |
            | courseShortId         | Template                  |