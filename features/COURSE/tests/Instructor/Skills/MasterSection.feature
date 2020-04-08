@Course @Smoke @API
Feature: Instructor creates Master Section, creates Custom task and content to it

    
    @instructor-masterSection-delete-course
   
    @delete-Courses
    Scenario: Verify that Instructor is able to create a Master Section in Skills Production

        Given I login to Achieve-CW as "media_producer_2"
        
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |   1               |
                                   
        And I click on "COURSE TEMPLATES" tab
        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                 |
          | Glossary                                   |
          | Exercise: Misused words 1 (autoscored)     |
          | LCRP1550612138614                          |

        And I copy course from "Skills Production Template" as "media_producer_2" with the following data
            | name                       | short_name | c_account   | is_course_template | course_term | course_year | status  | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Skills Production Course   | E2E 301    | null        | false              | spring      | 2020        | active  | course      | 9781464199490 | false         | todaydate             |  After3Months     |
            
        And I sign out of Achieve
        And I assign instructor to "Skills Production Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   2               | course         |
        And I login to Achieve-CW as "instructor_1"

        And I create a Master Section from "Skills Production Template" with following data
            | field             | value                            |
            | courseName        | Skills Production Master Course  |
            | courseCode        |  E2E 301                         |

        Then I verify that I created a Master Section with following data     
            | courseNameMS                       | Status                   | InstructorName    | MasterCode |
            |   Skills Production Master Course  | Draft Master Section     | instructor_1      | E2E 301    |