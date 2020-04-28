@Course @Smoke @API
Feature: Assigning the activities present in Skills Production Course 

    
    @delete-Courses
    Scenario: Verify that Instructor is able to assign the activities in Skills Production Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Skills Production Template          | E2E 301    | topics | draft  | 2                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |   1               |               

        And I add activities to the content library of "Skills Production Template" template
          | name                  |
          | Glossary              |
          | LCRP1551301608988     |
        
        And I copy course from "Skills Production Template" as "media_producer_2" with the following data
            | name                       | short_name | c_account   | is_course_template | course_term | course_year | status  | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Skills Production Course   | E2E 301    | null        | false              | spring      | 2020        | active  | course      | 9781464199490 | false         | todaydate             |  After3Months     |
            
        And I sign out of Achieve
        And I assign instructor to "Skills Production Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   2               | course         |
        And I login to Achieve-CW as "instructor_1"

     
        And I add activities in "Skills Production Course" courseplanner tab
            | activity                                                          |                                                        
            | LCRP1551301608988                                                 |
            | Glossary                                                          |
        
        And I close the popup message


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | LCRP1551301608988                                                | 5      |
            | Glossary                                                         | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status |  
            | LCRP1551301608988                                                | Open   |
            | Glossary                                                         | Open   |

        Then I see assignments due in the next 7 days on the course Plan tab

        Then I do not see assignments more than 7 days out on the course plan tab
