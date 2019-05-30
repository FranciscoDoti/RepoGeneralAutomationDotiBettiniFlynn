Feature: Create course

    Scenario:  Create course Template for Quantitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Quantitative Course Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        Then I verify that "Quantitative Template Created." message is displayed
        And I verify that "Quantitative Course Template" has created with following "ISBN: 9781464199498" number

    
