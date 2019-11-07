 @Course @Smoke
 Feature: Delete Qualitative template

     @mediaproducer-delete-courseTemplate
     @mediaproducer-delete-course
    Scenario: Verify that media producer is able to delete the  courses created

        Given I login to Achieve-CW as "media_producer_2"
        And I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template   | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |
        And I close the popup message                      

        And I click on search button and input "Qualitative Template" to search the course       

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 
        And I refresh the browser
        And I copy course from the "Qualitative Template" template with the following data
            | courseName            | courseCode           |
            | Qualitative Course    | E2E 301              |

        When I delete "Qualitative Template" and "Qualitative Course"

        Then I verify that "Qualitative Template" and "Qualitative Course" are deleted 