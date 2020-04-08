@Course @Smoke
Feature: Create course Read & Practice template

    @mediaproducer-delete-courseTemplate
    Scenario:  Create course Template for Read & Practice

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199490  | draft         |                      

        
        Then I verify that "Read & Practice Template Created." message is displayed
        And I verify that "Read & Practice Template" has created with following "9781464199490" number

    
