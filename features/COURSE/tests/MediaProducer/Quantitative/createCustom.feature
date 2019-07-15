
@Course @Smoke
Feature: Verify that media Producer is able to create Custom Task 
    @delete-mediaproducer-courses
    Scenario: Verify that media Producer is able to create Custom Task in Quantitative Template 
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |   
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




        