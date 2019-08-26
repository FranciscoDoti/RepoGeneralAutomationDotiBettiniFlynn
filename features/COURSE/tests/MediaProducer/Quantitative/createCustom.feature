
@Course @Smoke @Skip
Feature: Verify that media Producer is able to create Custom Task 

    @mediaproducer-delete-course
    Scenario: Verify that media Producer is able to create Custom Task in Quantitative CT Template 
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative CT Template  | Principles of Microeconomics      | E2E 349      | 9781464199423  | draft         |

        And I activate the "Quantitative CT Template" template and add the following data
            | courseName                |  courseCode      |  templateStatus      |
            | Quantitative CT Template  |   E2E 349        |  Active On Date         | 


        And I create Custom Task in "Quantitative CT Template" and add it to resources
            | activity           | value                                    |
            | assignmentTitle    | Quant Test                               |
            | taxonomy           | Interactive General Chemistry V1         |
            | assignmentType     | Test/Quiz                                |

        Then I verify that custom content is added to resources
            | activity    |
            | Quant Test  |




        