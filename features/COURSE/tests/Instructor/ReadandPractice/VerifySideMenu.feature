@Course @Smoke @API
Feature: Verify side menu in Read & Practice Course 

    @delete-Courses
    Scenario: Verify that the side menu exist in a Read & Practice Course
    
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Read & Practice Template            | E2E 301    | topics | draft  | 1                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |   1               |  
                               
         And I copy course from "Read & Practice Template" as "media_producer_2" with the following data
            | name                     | short_name | c_account   | is_course_template | course_term | course_year | status  | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Read & Practice Course   | E2E 301    | null        | false              | spring      | 2020        | active  | course      | 9781464199490 | false         | todaydate             |  After3Months     |
        
        And I assign instructor to "Read & Practice Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   1               | course         |
        And I login to Achieve-CW as "instructor_1"
        And I verify that the side menu exist in "Read & Practice Course"
