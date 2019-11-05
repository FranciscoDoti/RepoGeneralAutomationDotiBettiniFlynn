Feature: Create a Template and click on Production

    Scenario: Verify that Admin is able to create Qualitative Template and click on Production Tab

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                       | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Production Template  | macmillan calculus     | E2E 301      | 9781464199499  | draft         |

        And I update "Qualitative Production Template" template and add the following data
            | courseName                        |  courseCode   |  templateStatus      |
            | Qualitative Production Template   |   E2E 301     |  Active On Date      | 
        

        And I click on "Qualitative Production Template" card
        And I click on "Production" Tab

        Then I verify that following Tab are present
            | Tabs            |
            | Search          |
            | Create          |
            | Content Library |
            | Course Plan     |
            | E-book          |

    


        