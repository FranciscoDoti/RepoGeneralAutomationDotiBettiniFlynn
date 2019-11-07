 @Course @Smoke
 Feature: Delete Quantitative template  
     
    @mediaproducer-delete-courseTemplate
     @mediaproducer-delete-course
    Scenario: Verify that media producer is able to delete the  courses created

        Given I login to Achieve-CW as "media_producer_2"
        And I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |
        And I close the popup message                      

        And I click on search button and input "Qualitative Template" to search the course       

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template   |   E2E 301     |  Active On Date      | 
        And I refresh Browser
        And I copy course from the "Quantitative Template" template with the following data
            | courseName            | courseCode           |
            | Quantitative Course     | E2E 301              |

        When I delete "Quantitative Template" and "Quantitative Course"

        Then I verify that "Quantitative Template" and "Quantitative Course" are deleted 