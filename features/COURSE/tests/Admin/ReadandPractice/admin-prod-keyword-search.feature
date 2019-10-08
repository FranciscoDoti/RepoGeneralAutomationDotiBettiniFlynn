@Course @Smoke
Feature: Verify that Admin is able to search for the content using Keyword search filter

    @admin-delete-courseTemplate
    Scenario: Verify that Admin is able to search for the content using Keyword search filter in R&P course

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel          | courseName                               | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice       | Read & Practice Keyword Search Template  |                        | E2E 301      | 9781464199499  | Active On Date|
        
       Then I verify that "Read & Practice Keyword Search Template Created." message is displayed
       And I close the popup message

       And I search in "Read & Practice Keyword Search Template" template by keyword "Commas with Yes or No" using "Search by keyword" search bar in "filter-keyword-title" section