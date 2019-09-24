 @Course @Smoke
 Feature: Update Skills template  
     
    @mediaproducer-delete-courseTemplate       
    Scenario: Verify that Media Producer is able to update Skills template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Template  |                  | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Skills Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills Template           |   E2E 301     |  Active On Date      |
            
        Then I verify that "Skills Template" is activated with following data
            | CourseName                | Status                    |  ISBN               |
            | Skills Template           |  Active                   |  9781464199498      |