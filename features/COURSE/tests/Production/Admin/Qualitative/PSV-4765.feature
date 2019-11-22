@Course @Smoke
Feature: Verify that search filter is correctly displayed

    @admin-delete-courseTemplate
    Scenario: Create a template and verify that the search filter for content type is correctly displayed

       Given I login to Achieve-CW as "admin_2"

        When I create template with following data 
            | courseType  | productModel | courseName           | learningObjective     | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | PSV-4765             | macmillan calculus    | E2E 301      | 9772100299499  | draft         | 

        And I close the popup message                      

        And I click on search button and input "PSV-4765" to search the course

        And I activate "PSV-4765" template and add the following data
            | courseName                      |  courseCode   |  templateStatus      |
            | PSV-4766                        |   E2E 301     |  Active On Date      |         

        And I click on "PSV-4765" card
        And I click on "Production" Tab

        And I click on "" tab and verify the checkboxes with the following data
            | Author                |
            | David G. Myers        |