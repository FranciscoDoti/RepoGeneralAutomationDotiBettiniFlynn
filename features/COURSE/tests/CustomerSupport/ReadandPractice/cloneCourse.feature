@Course @Smoke @API
Feature: Customer Support is able to create course from Read & Practice Template

   
    @delete-Courses
    @customersupport-delete-course
    Scenario: Verify that Customer Support is able to create course from Read & Practice Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Read & Practice Template            | E2E 301    | topics | draft  | 1                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |   1               |               

                                
        And I click on "COURSE TEMPLATES" tab
        And I click on "Read & Practice Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          
        And I copy course from "Read & Practice Template" as "media_producer_2" with the following data
            | name                     | short_name | c_account   | is_course_template | course_term | course_year | status  | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Read & Practice Course   | E2E 301    | null        | false              | spring      | 2020        | active  | course      | 9781464199490 | false         | todaydate             |  After3Months     |


        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"
        And I click on "COURSES" tab        
        And I copy course from the "Read & Practice Course" Course with the following data
            | courseName                 | courseCode           |
            | Read & Practice CS Course  | E2E 301              |

        And I search for "Read & Practice CS Course" in Courses tab
        
        Then I verify that "Read & Practice CS Course" is created with following data
            | CourseName                   | Status                    |
            | Read & Practice CS Course    |  Draft                    |
           
        