@Smoke
Feature: Create course

    @delet-CourseName
    Scenario:  Create course Template for Qualitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Qualitative Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | courseCode        | E2E 301                      |
            | learningObjective | macmillan calculus           |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        Then I verify that "Qualitative Template Created." message is displayed
        And I verify that "Qualitative Template" has created with following "ISBN: 9781464199498" number

    
