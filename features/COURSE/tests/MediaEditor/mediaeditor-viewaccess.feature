@Course @Smoke @API
Feature: Media Editor has only view access that they are not a collaborator

     @delete-Courses
    Scenario: Verify that Media Editor has only view access that they are not collaborator

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id              | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Qualitative URL Template            | E2E 301    | topics | draft  | 4                | true               |  0050n000002Wt0kAACA  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   | 1                 |

                   
        And I click on "COURSE TEMPLATES" tab
        And I click on "Qualitative URL Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                             |
          | Glossary                               |
          | Exercise: Misused words 1 (autoscored) |

        And I sign out of Achieve

        And I login to Achieve-CW as "media_editor_1"

        Then I verify that media editor has only view access to "Quantitative Template"
        
