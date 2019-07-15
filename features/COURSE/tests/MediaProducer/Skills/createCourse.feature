
@Course @Smoke
Feature: Create course

    @delete-mediaproducer-courses
    Scenario:  Create course Template for Skills

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Skills Template" Template with following data 
            | courseType  | productModel | courseName       | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  | E2E 301      | 9781464199498 | draft         |                      


        Then I verify that "Skills Template Created." message is displayed
        And I verify that "Skills Template" has created with following "ISBN: 9781464199498" number

    
