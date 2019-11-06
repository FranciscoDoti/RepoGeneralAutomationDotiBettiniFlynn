Feature: Create a Template and click on Production

    Scenario: Admin creates the course template and adds an asssesment in the course plan

       Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | PSV-4771              | macmillan calculus     | E2E 301      | 9701733199499  | draft         |                 

        And I activate the "PSV-4771" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | PSV-4771               |   E2E 301     |  Active On Date      | 

        And I click on "PSV-4771" card
        And I click on "Production" Tab

        #And I create "TEST" custom activity in "Create" tab
        #    | assesmentTitle    | assesmentType     | homeTaxonomy                      |
        #    | TestAssesment     | Test/Quiz         | Interactive General Chemistry V1  |

        

        

        #And I add "TestAssesment" to the Course Library
        #And I click on "Course Library"
        #And I add "TestAssesment" to the course plan
        #And I click on "Course Plan"
        #And I verify that "TestAssesment" exist