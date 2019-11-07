 @Course @Smoke
 Feature: Delete Read & Practice template  

    @mediaproducer-delete-courseTemplate
     @mediaproducer-delete-course 
    Scenario: Verify that media producer is able to delete the  courses created

        Given I login to Achieve-CW as "media_producer_2"
        And I create template with following data 
            | courseType  | productModel    | courseName                | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice | Read & Practice Template  |                                   | E2E 301      | 9781464199498  | draft         |
        And I close the popup message                      

        And I click on search button and input "Read & Practice Template" to search the course       

        And I activate the "Read & Practice Template" template and add the following data
            | courseName                 |  courseCode   |  templateStatus      |
            | Read & Practice Template   |   E2E 301     |  Active On Date      | 

        And I refresh the browser
        And I copy course from the "Read & Practice Template" template with the following data
            | courseName            | courseCode           |
            | Read & Practice Course     | E2E 301              |

        When I delete "Read & Practice Template" and "Read & Practice Course"

        Then I verify that "Read & Practice Template" and "Read & Practice Course" are deleted 