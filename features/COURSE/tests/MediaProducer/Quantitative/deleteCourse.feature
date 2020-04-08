 @Course @Smoke @API
 Feature: Delete Quantitative template  
     
    
    @delete-Courses
    Scenario: Verify that media producer is able to delete the  courses created

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id             | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAACA  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |  1                |               
   
        And I copy course from "Quantitative Template" as "media_producer_2" with the following data
            | name                | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt |
            | Quantitative Course | E2E 301    | null        | false              | spring      | 2020        | draft  | course      | 9781464199490 | false         |

        
        When I delete "Quantitative Template" and "Quantitative Course"

        Then I verify that "Quantitative Template" and "Quantitative Course" are deleted 