Feature: Create course

    @delete-mediaproducer-courses
    Scenario:  Create course Template for Qualitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Qualitative Course Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | learningObjective | macmillancalculus            |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        Then I verify that "Qualitative Template Created." message is displayed
        And I verify that "Qualitative Template" has created with following "ISBN: 9781464199498" number

    
