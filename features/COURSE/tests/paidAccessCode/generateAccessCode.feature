@Course @Smoke @localonly
Feature: Verify that paid Access code Creater is able to generate, Check and update access code

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that paid Access code Creater is able to generate, Check and update access code

        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills Production Template  |                  | E2E 301      | 9781464199498  | draft         |                      
         And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course

        And I activate "Skills Production Template" template and add the following data
            | courseName                      |  courseCode   |  templateStatus      |
            | Skills Production Template      |   E2E 301     |  Active On Date      | 
        

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | GLOSSARY              |
          | LCRP1550612138614     |
          | LC1551301608988       |
          
        And I sign out of Achieve


        And I login to Achieve-CW as "paid_access"

        And I generate "1" month length access code for "Skills Production Template" 

        Then I verify that access code is generated "Skills Production Template"
            | Value         |
            | Access Code   |

        When I check Access Code of "Skills Production Template" 

        Then I verify that "Skills Production Template" is displayed

        When I update the access code for "Skills Production Template"
            | AccessCode   | Value      |
            | totalInput   | 2          |

        Then I verify that "Code update successful.." message is displayed 





        
