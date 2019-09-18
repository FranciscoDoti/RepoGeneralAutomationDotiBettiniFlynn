@Course @Smoke
 Feature: Update Read & Practice template  
     
    @mediaproducer-delete-courseTemplate       
    Scenario: Verify that Media Producer is able to update Read & Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |

        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 
            
        Then I verify that "Read & Practice Template" is created with following data
            | field                 | value                     |
            | courseCard            | Read & Practice Template  |
            | Status                |  Active                   |
            | ISBNVerification      | 9781464199498             |