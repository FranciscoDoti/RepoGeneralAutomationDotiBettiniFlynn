@Course @Smoke @Skip
Feature: Verify that media Producer is able to create Custom Task Qualitative template 

    @mediaproducer-delete-course
    Scenario: Verify that media Producer is able to create Custom Task in Qualitative Template
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I create Custom Task in "Qualitative Template" and add it to resources
            | activity           | value                                    |
            | assignmentTitle    | Quant Test                               |
            | taxonomy           | Interactive General Chemistry V1         |
            | assignmentType     | Test/Quiz                                |

        Then I verify that custom content is added to resources
            | activity    |
            | Quant Test  |




        