@Course @Smoke @API
Feature: Verify that customer Support is able to create access code for Template

    
    @delete-Courses
    Scenario: Verify that customer Support is able to create access code for Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                 | short_name | format | status | product_model_id | is_course_template | owner_id           | course_type | lo_framework_id                      | warn_prebuilt | isbn          | template_version  |
            | Qualitative Template | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC | template    | 57ba5934-30c2-4558-b776-b4bef6954d99 | false         | 9781464199490 | 1                 |

        And I click on "COURSE TEMPLATES" tab
        And I click on "Qualitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
            | activities                             |
            | Glossary                               |
            | Exercise: Misused words 1 (autoscored) |

        And I copy course from "Qualitative Template" as "media_producer_2" with the following data
            | name               | short_name | is_course_template | isbn          | course_term | course_year | status  | course_type | enrollment_start_date | course_end_date   | warn_prebuil |
            | Qualitative Course | E2E 301    | false              | 9781464199490 | spring      | 2020        | active  | course      | todaydate             |  After3Months     | false        |


        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I generate access code for "Qualitative Course"

        Then I verify that access code is generated

        When I update the access code
            | AccessCode   | Value      |
            | totalInput   | 2          |

        Then I verify that "Code update successful.." message is displayed 

        


