 @Course @Smoke @API
 Feature: Delete Skills template  

    
    @delete-Courses
    Scenario: Verify that media producer is able to delete the  courses created

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |  1                |
                                    
        And I copy course from "Skills Production Template" as "media_producer_2" with the following data
            | name                     | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt |
            | Skills Production Course | E2E 301    | null        | false              | spring      | 2020        | draft  | course      | 9781464199490 | false         |
                                    
        
        When I delete "Skills Production Template" and "Skills Production Course"

        Then I verify that "Skills Production Template" and "Skills Production Course" are deleted 