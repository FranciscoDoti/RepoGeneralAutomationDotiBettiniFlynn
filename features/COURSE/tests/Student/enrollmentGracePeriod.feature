
@Smoke @localonly @Course @API
Feature: Student Enrolls in the course using Grace Period

   
    @delete-Courses
    Scenario:Verify that Student can enroll in the course using Grace Period

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Qualitative Template                | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |
        
                   
        And I click on "COURSE TEMPLATES" tab
        And I click on "Qualitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                 |
          | Glossary                                   |
          | Exercise: Misused words 1 (autoscored)     |
        
        And I copy course from "Qualitative Template" as "media_producer_2" with the following data
            | name                | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Qualitative Course  | E2E 301    | null        | false              | spring      | 2020        | active | course      | 9781464199498 | false         |  todaydate            |  After3Months     |               

        And I sign out of Achieve
        And I assign instructor to "Qualitative Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   4               | course         |

        And I login to Achieve-CW as "instructor_1"

        When I activate "Qualitative Course" course with following data 
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I enroll "student_1" in "Qualitative Course" using Grace Period
        And I click on home button to return to coursepage

        Then I verify that student is enrolled in "Qualitative Course"


          



     
        

    