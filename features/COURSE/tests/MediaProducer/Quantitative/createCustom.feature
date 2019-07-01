Feature: Verify that media Producer is able to create Custom Task 

    Scenario: Verify that media Producer is able to create Custom Task in Quantitative Template

        
        Given I login to Achieve-CW as "media_producer_2"
        When I create "Quantitative Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Quantitative                 |
            | courseName        | Quantitative Template        |
            | courseCode        | E2E 301                      |
            | learningObjective | Principles of Microeconomics |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Quantitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Quantitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I create Custom Task in "Quantitative Template" and add it to resources
            | activity           | value                                    |
            | assignmentTitle    | Quant Test                               |
            | assignmentType     | Test                                     |
            | taxonomy           | Interactive General Chemistry V1         |

        Then I verify that custom content is added to resources
            | activity    |
            | Quant Test  |




        