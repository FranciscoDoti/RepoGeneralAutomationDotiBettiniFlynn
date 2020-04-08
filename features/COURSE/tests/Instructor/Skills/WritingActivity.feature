@Course @Smoke @flaky @API
Feature: Instructor creates writing activity in Skills Production Template

    
    @delete-Courses
    Scenario: Verify that Instructor is able to create Custom Writing activity 

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |   1               |
                                   
        And I click on "COURSE TEMPLATES" tab
        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          | LCRP1551301608988     |
          
        And I copy course from "Skills Production Template" as "media_producer_2" with the following data
            | name                       | short_name | c_account   | is_course_template | course_term | course_year | status  | course_type | isbn           | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Skills Production Course   | E2E 301    | null        | false              | spring      | 2020        | active  | course      | 9781464199490  | false         | todaydate             |  After3Months     |
            

        And I sign out of Achieve
        And I assign instructor to "Skills Production Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   2               | course         |
        And I login to Achieve-CW as "instructor_1"

        And I add the activities in courseplanner to "Skills Production Course" course
            | activity                                                          |
            |   Glossary                                                        |                                                        
            | LCRP1551301608988                                                 |
            | LCRP1550612138614                                                 |

        And I create "Skills Assignment" writing activity as an instructor

        Then I verify that "Skills Assignment" writing activity is added in Browse

        When I add custom content courseplanner
            | activity                                    |
            | Skills Assignment                           | 

        Then I verify that activties are added in courseplanner
            | activity                                                            | 
            | Skills Assignment                                                   |
        


