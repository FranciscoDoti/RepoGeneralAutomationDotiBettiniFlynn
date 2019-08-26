@Course @Smoke @Skip
Feature: Verify that media Producer is able to create Custom Task 

    @mediaproducer-delete-course
    Scenario: Verify that media Producer is able to create Custom Task in Qualitative MPCTTemplate
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative MPCTTemplate  | macmillan calculus     | E2E 339      | 9781464199432  | draft         |                      


        And I activate the "Qualitative MPCTTemplate" template and add the following data
            | courseName                 |  courseCode   |  templateStatus      |
            | Qualitative MPCTTemplate   |   E2E 339     |  Active On Date      | 

        And I create Custom Task in "Qualitative MPCTTemplate" and add it to resources
            | activity           | value                                    |
            | assignmentTitle    | Quant Test                               |
            | taxonomy           | Interactive General Chemistry V1         |
            | assignmentType     | Test/Quiz                                |

        Then I verify that custom content is added to resources
            | activity    |
            | Quant Test  |




        