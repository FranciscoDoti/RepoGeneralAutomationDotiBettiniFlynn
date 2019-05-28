Feature: Create course

    Scenario:  Create course Template for Quantitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Quantitative Course Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative course Template |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        Then I verify that "Quantitative course Template Created." message is displayed
        And I verify that "Quantitative Course Template" has created with following "ISBN: 9781464199498" number

    Scenario: Create course Template for Qualitative

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Qualitative Course Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative course Template  |
            | learningObjective | Principles of Economics      |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        Then I verify that "Qualitative course Template Created." message is displayed
        And I verify that "Qualitative Course Template" has created with following "ISBN: 9781464199499" number

    Scenario: Create course Template for Skills

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Course Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills course Template       |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199410                |
            | courseStatus      | draft                        |

        Then I verify that "Skills course Template Created." message is displayed
        And I verify that "Skills Course Template" has created with following "ISBN: 9781464199410" number

    Scenario: Create course Template for Read and Practice 

         Given I login to Achieve-CW as "media_producer_2"
        When I create "Read & Practice Course Template" with the data 
            | field             | value                             |
            | courseType        | Template                          |
            | productModel      | Read & Practice                   |
            | courseName        | Read & Practice course Template   |
            | learningObjective | Principles of Economics           |
            | courseCode        | E2E 301                           |
            | isbnNumber        | 9781464199411                     |
            | courseStatus      | draft                             |

        Then I verify that "Read & Practice course Template Created." message is displayed
        And I verify that "Read & Practice Course Template" has created with following "ISBN: 9781464199411" number






