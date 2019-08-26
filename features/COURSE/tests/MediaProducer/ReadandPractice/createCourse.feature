@Course @Smoke
Feature: Create course

    @mediaproducer-delete-course
    Scenario:  Create course Template for Read & Practice

        Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
            | courseType  | productModel      | courseName                      |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice MPC Template    |                  | E2E 359      | 9781464199414  | draft         |                      


        Then I verify that "Read & Practice MPC Template Created." message is displayed
        And I verify that "Read & Practice MPC Template" has created with following "ISBN: 9781464199414" number

    
