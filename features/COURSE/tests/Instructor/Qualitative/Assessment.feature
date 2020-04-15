@Course @Smoke @flaky @API
Feature: Instructor creates Assessment custom task 

    
    @delete-Courses
    Scenario: Verify that Instructor is able to create custom Assessment task in Qualitative Course 

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
        And I assign instructor to "Qualitative Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   4               | course         |

        
        And I login to Achieve-CW as "instructor_1"

        And I add the activities in courseplanner to "Qualitative Course" course
            | activity                                                          | 
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | Glossary                                                          | 
        And I close the popup message

        And I create a custom assessment task with following data
            | assessmentTitle    | assessmentType     | homeTaxonomy                       |
            | Qual Test          | Test/Quiz          | Interactive General Chemistry V1   |

        Then I verify that custom content task is added in "MY CONTENT" tab 
            |  activity       |
            |  Qual Test      |
        
        When I add custom content courseplanner
            | activity  |
            | Qual Test | 

        Then I verify that activties are added in courseplanner
            | activity  |
            | Qual Test | 

