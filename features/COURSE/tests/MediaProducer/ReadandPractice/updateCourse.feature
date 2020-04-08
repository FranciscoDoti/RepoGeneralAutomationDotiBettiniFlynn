@Course @Smoke
 Feature: Update Read & Practice template  
     
     @mediaproducer-delete-courseTemplate         
    Scenario: Verify that Media Producer is able to update Read & Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199490  | draft         |
        
        And I close the popup message                      
        And I click on search button and input "Read & Practice Template" to search the course


        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 
            
        Then I verify that "Read & Practice Template" is activated with following data
            | CourseName               | Status                 | ISBN                      |
            | Read & Practice Template |  Active                | 9781464199490             |