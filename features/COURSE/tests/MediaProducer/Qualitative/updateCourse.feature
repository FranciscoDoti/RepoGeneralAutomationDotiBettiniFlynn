 @Course @Smoke
 Feature: Update Qualitative template  
     
    @mediaproducer-delete-courseTemplate       
    Scenario: Verify that Media Producer is able to update Qualitative template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |

        And I close the popup message                      

        And I click on search button and input "Qualitative Template" to search the course                      

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 
            
        Then I verify that "Qualitative Template" is activated with following data
            | CourseName            | Status                    | ISBN                      |
            | Qualitative Template  | Active                    | 9781464199498             |