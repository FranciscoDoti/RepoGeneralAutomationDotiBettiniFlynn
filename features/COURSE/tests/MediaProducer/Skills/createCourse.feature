
@Course @Smoke
Feature: Create course

    @mediaproducer-delete-course
    Scenario:  Create course Template for Skills

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
           | courseType  | productModel | courseName           |learningObjective | courseCode   | isbnNumber     | courseStatus  |
           | Template    | Skills       | Skills MPC Template  |                  | E2E 365      | 9781464199407  | draft         |                      


        Then I verify that "Skills MPC Template Created." message is displayed
        And I verify that "Skills MPC Template" has created with following "ISBN: 9781464199407" number

    
