@Course @Smoke @localonly
Feature: Verify that paid Access code Creater is able to generate, Check and update access code

    @delete-Courses  
    
    Scenario: Verify that paid Access code Creater is able to generate, Check and update access code

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |  1                |
                                    
                               
        And I click on "COURSE TEMPLATES" tab
        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          | LCRP1551301608988     |
          
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





        
