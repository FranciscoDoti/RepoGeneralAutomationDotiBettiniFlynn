@Course @Smoke
Feature: Create course

    @delete-mediaproducer-courses
    Scenario:  Create course Template for Quantitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Quantitative Template" with ISBN "9781464199498" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | courseCode        | E2E 301                      |
            | learningObjective | Principles of Microeconomics |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        Then I verify that "Quantitative Template Created." message is displayed
        And I verify that "Quantitative Template" has created with following "ISBN: 9781464199498" number

    
