
@Course @Smoke @flaky @API
Feature: Assigning the activities present in Quantitative course 

    
    @delete-Courses
    Scenario: Verify that Instructor is able to assign the activities in Quantitative course

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |  
        
        And I add activities to the content library of "Quantitative Template" template
          | name                  |
          | Glossary              |
          | LCRP1550612138614     |
          
        And I copy course from "Quantitative Template" as "media_producer_2" with the following data
            | name                  | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Quantitative Course   | E2E 301    | null        | false              | spring      | 2020        | active | course      | 9781464199490 | false         | todaydate             |  After3Months     |

        And I sign out of Achieve
       And I assign instructor to "Quantitative Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   3               | course         |
        And I login to Achieve-CW as "instructor_1"
     
        And I add activities in "Quantitative Course" courseplanner tab
            | activity                                                          | 
            | LCRP1550612138614                                                 |                                                        
            | Glossary                                                          |

        And I close the popup message


        And I assign the activities in courseplanner
            | activity                                                         | Points | 
            | LCRP1550612138614                                                | 5      | 
            | Glossary                                                         | 5      |

        Then I verify that activities are assigned
            | activity                                                         | Status | 
            | LCRP1550612138614                                                | Open   |
            | Glossary                                                         | Open   |
        Then I see assignments due in the next 7 days on the course Plan tab

        Then I do not see assignments more than 7 days out on the course plan tab

