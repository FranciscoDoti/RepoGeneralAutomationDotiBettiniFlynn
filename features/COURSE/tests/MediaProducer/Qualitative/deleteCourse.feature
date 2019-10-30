 @Course @Smoke
 Feature: Delete Qualitative template  
     
    Scenario: Verify that media producer is able to delete the  courses created

        Given I login to Achieve-CW as "media_producer_2"
        And I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 

        And I copy course from the "Qualitative Template" template with the following data
            | courseName            | courseCode           |
            | Qualitative Course     | E2E 301              |

        When I delete "Qualitative Template" and "Qualitative Course"

        Then I verify that "Qualitative Template" and "Qualitative Course" are deleted 