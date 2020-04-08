@Course @Smoke @API
Feature: Verify side menu in Quantitative Course 

<<<<<<< HEAD
   
    @delete-Courses
    @instructor-delete-course
=======
    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
>>>>>>> 9d4f363b4264b45451aed951109c480039231b41
    Scenario: Verify that the side menu exist in a Quantitative Course
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |  
        And I copy course from "Quantitative Template" as "media_producer_2" with the following data
            | name                  | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Quantitative Course   | E2E 301    | null        | false              | spring      | 2020        | active | course      | 9781464199490 | false         | todaydate             |  After3Months     |

<<<<<<< HEAD
        And I sign out of Achieve
        And I assign instructor to "Quantitative Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   3               | course         |
        And I login to Achieve-CW as "instructor_1"

        And I create a single course from "Quantitative Template" with following data
            | field             | value                        |
            | courseName        | Quantitative Single Course   |
            | courseCode        |  E2E 301                     |

        And I verify that the side menu exist in "Quantitative Single Course"
=======
        And I verify that the side menu exist in "Quantitative Course"
>>>>>>> 9d4f363b4264b45451aed951109c480039231b41
