@Course @Smoke @API
Feature: Verify side menu in Quantitative Course 

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario: Verify that the side menu exist in a Qualitative Course
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                 | short_name | format | status | product_model_id | is_course_template | owner_id           | course_type | lo_framework_id                      | warn_prebuilt | isbn          | template_version  |
            | Qualitative Template | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC | template    | 57ba5934-30c2-4558-b776-b4bef6954d99 | false         | 9781464199490 |   1               |
        
        And I click on "COURSE TEMPLATES" tab
        And I click on "Qualitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
            | activities                             |
            | Glossary                               |
            | Exercise: Misused words 1 (autoscored) |

        And I verify that the side menu exist in "Qualitative Course"
