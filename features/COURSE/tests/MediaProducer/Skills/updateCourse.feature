 @Course @Smoke @API
 Feature: Update Skills Production Template  
     
    @mediaproducer-delete-courseTemplate          
    Scenario: Verify that Media Producer is able to update Skills Production Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName                   |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Production Template  |                   | E2E 301      | 9781464199490  | draft         |                      

        And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course
        And I activate the "Skills Production Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills Production Template    |   E2E 301     |  Active On Date      |
            
        Then I verify that "Skills Production Template" is activated with following data
            | CourseName                    | Status                    |  ISBN               |
            | Skills Production Template    |  Active                   |  9781464199490      |