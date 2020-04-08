@Course @Smoke
Feature: Create course Quantitative Template

    @mediaproducer-delete-courseTemplate
    Scenario:  Create course Template for Quantitative

       Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
            | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199490  | draft         |   
        Then I verify that "Quantitative Template Created." message is displayed
        And I verify that "Quantitative Template" has created with following "9781464199490" number

    
