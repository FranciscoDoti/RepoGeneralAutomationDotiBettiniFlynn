@Course @Smoke @psv-4761
Feature: Verify that Admin is able to search for the content using Keyword search filter

    @admin-delete-courseTemplate
    Scenario: Verify that Admin is able to search for the content using Keyword search filter in Quant course

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel       | courseName                            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative Keyword Search Template  | macmillan calculus     | E2E 301      | 9781464199499  | draft         |
        
       Then I verify that "Created." message is displayed
       And I close the popup message

       Then I verify that "Search" section exists in the "Production" view in "randoMTemplate" course
       
       And I search the "Glossary" activity using "Search by keyword" search bar in "filter-keyword-title" section