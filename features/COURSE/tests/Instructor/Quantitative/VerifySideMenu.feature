@Course @Smoke
Feature: Verify side menu in Quantitative Course 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that the side menu exist in a Quantitative Course
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative      | Quantitative Template| macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


         And I close the popup message                      

        And I click on search button and input "Quantitative Template" to search the course 
                            

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 

        And I copy course from the "Quantitative Template" template with the following data
            | courseName          | courseCode           |
            | Quantitative Course | E2E 301              |

        And I verify that the side menu exist in "Quantitative Course"