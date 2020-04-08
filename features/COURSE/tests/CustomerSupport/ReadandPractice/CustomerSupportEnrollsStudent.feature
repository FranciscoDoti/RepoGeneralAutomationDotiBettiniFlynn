@Course @Smoke @API
Feature: Customer Support enrolls the student in Read & Practice course 

    
    @delete-Courses
    Scenario: Verify that admin enrolls student in Read & Practice course 

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Read & Practice Template            | E2E 301    | topics | draft  | 1                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |  1                |

                                       
        And I click on "COURSE TEMPLATES" tab                      
        And I click on "Read & Practice Template" card
        And I click on "Production" Tab
        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | LCRP1550612138614     |
          | LCRP1551301608988     |
          
          
        And I copy course from "Read & Practice Template" as "media_producer_2" with the following data
            | name                     | short_name | c_account   | is_course_template | course_term | course_year | status  | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Read & Practice Course   | E2E 301    | null        | false              | spring      | 2020        | active  | course      | 9781464199490 | false         | todaydate             |  After3Months     |


        And I sign out of Achieve

       And I assign instructor to "Read & Practice Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   1               | course         |

        And I login to Achieve-CW as "instructor_1"
        And I add activities in "Read & Practice Course" courseplanner tab
            | activity                                                          | 
            | LCRP1550612138614                                                 |                                                        
            | LCRP1551301608988                                                 |
            | Glossary                                                          |
        And I close the popup message

        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | LCRP1550612138614                                                | 5      | 
            | LCRP1551301608988                                                | 5      |
            | Glossary                                                         | 5      | 
        And I sign out of Achieve

        And I login to Achieve-CW as "customer_support_1" 
        And I enroll the "student_1" in "Read & Practice Course" course
        And I sign out of Achieve

        Then I verify that "Read & Practice Course" is assigned to "student_1"
        And I sign out of Achieve 