@Course @Smoke @API
Feature: Verify side menu in Read & Practice Course 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that the side menu exist in a Read & Practice Course
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName              | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template|                        | E2E 301      | 9781464199498  | draft         |                      


         And I close the popup message                      

        And I click on search button and input "Read & Practice Template" to search the course 
                            

        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 

        And I copy course from the "Read & Practice Template" template with the following data
            | courseName            | courseCode           |
            | Read & Practice Course | E2E 301              |

        And I verify that the side menu exist in "Read & Practice Course"
