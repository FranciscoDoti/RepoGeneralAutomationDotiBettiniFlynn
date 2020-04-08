@Course @Smoke @API
Feature: Verify that Instructor is able to create URL In Quantitative Course

   
    @delete-Courses
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Quantitative Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |  
        
        And I click on "COURSE TEMPLATES" tab
        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
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

     
        And I add the activities in courseplanner to "Quantitative Course" course
            | activity                                                          | 
            | LCRP1550612138614                                                 |                                                        
            | Glossary                                                          |

        And I close the popup message

        And I add URL link to "Quantitative Course" in coursePlanner
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"" message is displayed

        And I add URL in courseplanner
            | activity                                    |
            | Google                                      |

        Then I verify that activties are added in courseplanner
            | activity                                                            | 
            | Google                                                              |      