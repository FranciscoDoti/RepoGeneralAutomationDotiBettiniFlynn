Feature: Create a Template and click on Production

    Scenario: Verify that Admin is able to create Qualitative Template and click on Production Tab

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                       | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | PSV-4759 Template                | macmillan calculus     | E2E 301      | 9786743199499  | draft         |

        And I update "Qualitative Production Template" template and add the following data
            | courseName                        |  courseCode   |  templateStatus      |
            | PSV-4759 Template                 |   E2E 301     |  Active On Date      | 
        

        And I click on "PSV-4759 Template" card
        And I click on "Production" Tab
    
    Scenario: I create an assesment then I add it to the course library and course plan

        When I click on the "Create"
        And I create the following assesments
            | assesmentTitle    | assesmentType     |
            | TestAssesment     | Test/Quiz         |

        And I add "TestAssesment" to the Course Library
        And I click on "Course Library"
        And I add "TestAssesment" to the course plan
        And I click on "Course Plan"
        And I verify that "TestAssesment" exist