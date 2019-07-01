Feature: Create course

    @delete-mediaproducer-courses
    Scenario:  Create course Template for Read & Practice

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Read & Practice Course Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Read & Practice              |
            | courseName        | Read & Practice Template     |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        Then I verify that "Read & Practice Template Created." message is displayed
        And I verify that "Read & Practice Template" has created with following "ISBN: 9781464199498" number

    
