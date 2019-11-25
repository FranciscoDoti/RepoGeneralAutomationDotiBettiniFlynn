Feature: Verify that search filter is correctly displayed

    Scenario: Create a template and verify that the search filter for Author is correctly displayed

       Given I login to Achieve-CW as "admin_2"

        When I create template with following data 
            | courseType  | productModel | courseName           | learningObjective     | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | PSV-4766             | macmillan calculus    | E2E 301      | 9772100299499  | draft         | 

        And I close the popup message                      

        And I click on search button and input "PSV-4766" to search the course

        And I activate "PSV-4766" template and add the following data
            | courseName                      |  courseCode   |  templateStatus      |
            | PSV-4766                        |   E2E 301     |  Active On Date      |         

        And I click on "PSV-4766" card
        And I click on "Production" Tab

        And I click on "Author" tab and verify the checkboxes with the following data
            | Author                |
            | David G. Myers        |