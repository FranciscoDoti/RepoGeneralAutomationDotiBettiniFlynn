@Course @Smoke
Feature: Create course

    @delete-mediaproducer-courses
    Scenario:  Create course Template for Read & Practice

        Given I login to Achieve-CW as "media_producer_2"
       When I create "Read & Practice Template" Template with following data 
            | courseType  | productModel      | courseName                  | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    | E2E 301      | 9781464199498 | draft         |                      


        Then I verify that "Read & Practice Template Created." message is displayed
        And I verify that "Read & Practice Template" has created with following "ISBN: 9781464199498" number

    
