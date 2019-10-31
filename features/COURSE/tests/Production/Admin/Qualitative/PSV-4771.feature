Feature: Create a Template and click on Production

    Scenario: Admin creates the course template and adds an asssesment in the course plan

       Given I login to Achieve-CW as "admin_1"
       When I create template with following data 
            | courseType  | productModel      | courseName                       | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | PSV-4771 Template                | macmillan calculus     | E2E 301      | 9701733199499  | draft         |

        And I update "PSV-4771 Template" template and add the following data
            | courseName                        |  courseCode   |  templateStatus      |
            | PSV-4771 Template                 |   E2E 301     |  Active On Date      | 
        

        And I create Custom Task in "PSV-4771 Template" and create an assesment
            | assesmentTitle    | assesmentType     | homeTaxonomy                      |
            | TestAssesment     | Test/Quiz         | Interactive General Chemistry V1  |

        And I add "TestAssesment" to the Course Library
        And I click on "Course Library"
        And I add "TestAssesment" to the course plan
        And I click on "Course Plan"
        And I verify that "TestAssesment" exist