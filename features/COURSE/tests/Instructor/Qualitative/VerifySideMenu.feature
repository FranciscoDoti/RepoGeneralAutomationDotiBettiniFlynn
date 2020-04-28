@Course @Smoke @API
Feature: Verify side menu in Qualitative Course 

    @delete-Courses
    Scenario: Verify that the side menu exist in a Qualitative Course
    
        When I create a course as "media_producer_2" with the following data
            | name                 | short_name | format | status | product_model_id | is_course_template | owner_id           | course_type | lo_framework_id                      | warn_prebuilt | isbn          | template_version  |
            | Qualitative Template | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC | template    | 57ba5934-30c2-4558-b776-b4bef6954d99 | false         | 9781464199490 |   1               |
        
        And I copy course from "Qualitative Template" as "media_producer_2" with the following data
            | name               | short_name | is_course_template | isbn          | course_term | course_year | status  | course_type | enrollment_start_date | course_end_date   | warn_prebuil |
            | Qualitative Course | E2E 301    | false              | 9781464199490 | spring      | 2020        | active  | course      | todaydate             |  After3Months     | false        |
            And I assign instructor to "Qualitative Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   4               | course         |
         And I login to Achieve-CW as "instructor_1"

        And I verify that the side menu exist in "Qualitative Course"
