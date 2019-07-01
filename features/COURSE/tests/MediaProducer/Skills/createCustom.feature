Feature: Verify that media Producer is able to create Custom Task 

    Scenario: Verify that media Producer is able to create Custom Task in Skills Template

        
        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills Template              |  
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I create writing Custom Task in "Skills Template" and add it to resources
            | activity           | value                                    |
            | assignmentTitle    | Quant Test                               |
            | assignmentType     | Test                                     |
            | taxonomy           | Interactive General Chemistry V1         |

        Then I verify that custom content is added to resources
            | activity    |
            | Skills      |