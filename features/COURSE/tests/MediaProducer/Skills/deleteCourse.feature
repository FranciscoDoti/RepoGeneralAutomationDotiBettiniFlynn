 @Course @Smoke
 Feature: Delete Skills template  

    @mediaproducer-delete-courseTemplate
    @mediaproducer-delete-course 
    Scenario: Verify that media producer is able to delete the  courses created

        Given I login to Achieve-CW as "media_producer_2"
        And I create template with following data 
            | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |
        And I close the popup message                      

        And I click on search button and input "Skills Template" to search the course      

        And I activate the "Skills Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Skills Template        |   E2E 301     |  Active On Date      | 

        And I refresh the browser

        And I copy course from the "Skills Template" template with the following data
            | courseName            | courseCode           |
            | Skills Course         | E2E 301              |

        When I delete "Skills Template" and "Skills Course"

        Then I verify that "Skills Template" and "Skills Course" are deleted 