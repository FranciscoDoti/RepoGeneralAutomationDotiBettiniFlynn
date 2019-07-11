@Course @Smoke
Feature: Media Editor is able to create a template and update

   @delete-mediaEditor-9781464199499
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
        When I create Course Template with ISBN "9781464199499" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Read & Practice              |
            | courseName        | Read & Practice Template     |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        Then I verify that "Read & Practice Template Created." message is displayed
        And I verify that "Read & Practice Template" has created with following "ISBN: 9781464199499" number

       And I activate the "Read & Practice Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Read & Practice Template                                    |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        Then I verify that "Read & Practice Template" is created with following data
            | field                 | value                     |
            | courseName            | Read & Practice Template  |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |