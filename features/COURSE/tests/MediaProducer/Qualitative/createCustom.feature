@Smoke
Feature: Verify that media Producer is able to create Custom Task 

    Scenario: Verify that media Producer is able to create Custom Task in Qualitative Template

        
        Given I login to Achieve-CW as "media_producer_2"
        When I create "Qualitative Template" with ISBN "9781464199498" 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | courseCode        | E2E 301                      |
            | learningObjective | macmillan calculus           |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                       |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I create Custom Task in "Qualitative Template" and add it to resources
            | activity           | value                                    |
            | assignmentTitle    | Quant Test                               |
            | assignmentType     | Test                                     |
            | taxonomy           | Interactive General Chemistry V1         |

        Then I verify that custom content is added to resources
            | activity    |
            | Quant Test  |




        