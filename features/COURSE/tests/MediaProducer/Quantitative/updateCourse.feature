@Course @Smoke @API
 Feature: Update the Template to Quantitative Template  
     
    @mediaproducer-delete-courseTemplate            
    Scenario: Verify that Media Producer is able to update Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199490  | draft         |

        And I close the popup message 
        And I click on search button and input "Quantitative Template" to search the course  

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 

            
        Then I verify that "Quantitative Template" is activated with following data
            | CourseName            | Status                    | ISBN                      |
            | Quantitative Template |  Active                   |  9781464199490            |