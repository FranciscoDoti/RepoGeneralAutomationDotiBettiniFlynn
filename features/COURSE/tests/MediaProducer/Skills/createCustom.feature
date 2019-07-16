@Smoke
Feature: Verify that media Producer is able to create Custom Task 
    @delete-mediaproducer-courses
    Scenario: Verify that media Producer is able to create Custom Task in Quantitative Template
 
        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" with the data 
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Skills                       |
            | courseName        | Skills Template              |  
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199499                |
            | courseStatus      | draft                        |

        And I activate the "Skills Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Skills Template                                             |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I create "WT" Custom Task in "Skills Template" and add it to resources
            | activity              | value                                    | Scales  | Description      |
            | nameRubric            | Names                                    | Scale 1 | Enter with A     |
            | criterion             | Enter Names                              | Scale 2 | Eneter with B    |
            | criterionDescription  | First Name and Last Name                 | Scale 3 | Eneter with C    |
                                

        Then I verify that custom content is added to resources
            | activity                         |
            | Untitled Writing ActivityWT      |