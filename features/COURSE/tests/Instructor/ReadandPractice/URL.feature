@Course @Smoke @API
Feature: Verify that Instructor is able to create URL in Read & Practice Template 

   
    @delete-Courses
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Read & Practice Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | warn_prebuilt | isbn             | template_version  |
            | Read & Practice Template            | E2E 301    | topics | draft  | 1                | true               | 0050n000002Wt0kAAC  | template      |  false        |  9781464199490   |   1               |  
                                              
                                                        
        And I add activities to the content library of "Read & Practice Template" template
          | name                  |
          | Glossary              |
          | LCRP1550612138614     |
          
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
            | Glossary                                                          |
        
        And I close the popup message

        And I add URL link to "Read & Practice Course" in coursePlanner
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        And I add URL in courseplanner
            | activity                                    |
            | Google                                      |

        Then I verify that activties are added in courseplanner
            | activity                                                            | 
            | Google                                                              |