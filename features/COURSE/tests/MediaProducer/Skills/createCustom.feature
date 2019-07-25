@Course @Smoke
Feature: Verify that media Producer is able to create Custom Task 
    @mediaproducer-delete-course
    Scenario: Verify that media Producer is able to create Custom Task in Quantitative Template
 
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      

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