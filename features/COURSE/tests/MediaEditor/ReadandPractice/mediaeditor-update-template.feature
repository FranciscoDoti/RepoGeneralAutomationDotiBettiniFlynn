@Course @Smoke
Feature: Media Editor is able to create a template and update

   @medieditor-delete-course
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                      |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice ME Template     |                  | E2E 331      | 9781464199441  | draft         |                      

        Then I verify that "Read & Practice ME Template Created." message is displayed
        And I verify that "Read & Practice ME Template" has created with following "ISBN: 9781464199498" number

       And I activate the "Read & Practice ME Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Read & Practice ME Template   |   E2E 331     |  Active On Date      | 

        Then I verify that "Read & Practice ME Template" is created with following data
            | field                 | value                         |
            | courseName            | Read & Practice ME Template   |
            | courseDate            |  E2E 331                      |
            | courseShortId         | Template                      |