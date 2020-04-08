@Course @Smoke @API
Feature: Adding activities to Skills Production Template

    @delete-Courses      
    Scenario: Verify that Media Producer is able to add activities to Skills Production Template

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
          | LCRP1551301608988     |

        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | LCRP1551301608988                             |
            |  Glossary                                     |            