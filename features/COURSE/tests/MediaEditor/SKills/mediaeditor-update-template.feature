@Course @Smoke
Feature: Media Editor is able to create a template and update in SKills Template

   @medieditor-delete-course
    Scenario: Verify that media editor is able to create a template and update in Skills Template

        Given I login to Achieve-CW as "media_editor_1"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      


        Then I verify that "Skills Template Created." message is displayed
        And I verify that "Skills Template" has created with following "ISBN: 9781464199498" number

       And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |

        Then I verify that "Skills Template" is created with following data
            | field                 | value                     |
            | courseName            | Skills Template           |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |

        When I clone content from "2/26 test" template
            | field                 | value                     |
            | courseName            | 2/26 test                 |

        Then I verify if content was imported successfully