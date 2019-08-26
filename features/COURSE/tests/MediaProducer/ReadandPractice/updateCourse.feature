@Course @Smoke
 Feature: Update the Template   
     
    @mediaproducer-delete-course       
    Scenario: Verify that Media Producer is able to update the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                       |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice MPUC Template    |                  | E2E 361      | 9781464199412  | draft         |

        And I activate the "Read & Practice MPUC Template" template and add the following data
            | courseName                     |  courseCode   |  templateStatus      |
            | Read & Practice MPUC Template  |   E2E 361     |  Active On Date      | 
            
        Then I verify that "Read & Practice MPUC Template" is created with following data
            | field                 | value                          |
            | courseName            | Read & Practice MPUC Template  |
            | courseDate            |  E2E 361                       |
            | courseShortId         | Template                       |