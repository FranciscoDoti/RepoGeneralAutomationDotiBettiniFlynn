Feature: Media Editor is able to create a template and update

   @delete-ISBN-9781464199499
    Scenario: Verify that media editor is able to create a template and update it 

        Given I login to Achieve-CW as "media_editor_1"
        When I create Course Template with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        Then I verify that "Quantitative Template Created." message is displayed
        And I verify that "Quantitative Template" has created with following "ISBN: 9781464199499" number

       And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        Then I verify that "Quantitative Template" is created with following data
            | field                 | value                     |
            | courseCardName        | Quantitative Template     |
            | courseDate            |  E2E 301                  |
            | courseShortId         | Template                  |