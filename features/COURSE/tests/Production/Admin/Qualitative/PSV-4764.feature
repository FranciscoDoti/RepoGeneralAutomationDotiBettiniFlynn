@Course @Smoke
Feature: Verify that search filter is correctly displayed

    @admin-delete-courseTemplate
    Scenario: Create a template and verify that the search filter is correctly displayed

       Given I login to Achieve-CW as "admin_2"

        When I create template with following data 
            | courseType  | productModel | courseName           | learningObjective     | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | PSV-4764             | macmillan calculus    | E2E 301      | 9701135299499  | draft         | 

        And I close the popup message                      

        And I click on search button and input "PSV-4764" to search the course

        And I activate "PSV-4764" template and add the following data
            | courseName                      |  courseCode   |  templateStatus      |
            | PSV-4764                        |   E2E 301     |  Active On Date      | 
        

        And I click on "PSV-4764" card
        And I click on "Production" Tab

        And I click on "ISBN" tab and verify the checkboxes with the following data
            | ISBN          |
            | 9897989798087 |