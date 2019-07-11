
@Course @Smoke
Feature: Create course

    @delete-mediaproducer-courses
    Scenario:  Create course Template for Skills

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" with ISBN "9781464199498"
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills Template              |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        Then I verify that "Skills Template Created." message is displayed
        And I verify that "Skills Template" has created with following "ISBN: 9781464199498" number

    
