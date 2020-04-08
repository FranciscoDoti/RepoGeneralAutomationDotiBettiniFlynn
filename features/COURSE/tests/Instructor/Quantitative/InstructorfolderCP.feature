@Course @Smoke @API
Feature: Instructor adds folder, remove folder and reorders it in Quantitative Course

    
    @delete-Courses
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources in Quantitative Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |  
        
        And I click on "COURSE TEMPLATES" tab
        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                             |
          | Glossary                               |
          | LCRP1550612138614                      |
          | LCRP1551301608988                      |
          | Exercise: Misused words 1 (autoscored) |
        
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
            | Exercise: Misused words 1 (autoscored)                            |                                                        
            | LCRP1551301608988                                                   |
            | Glossary                                                          |
            | LCRP1550612138614                                                 |
        And I close the popup message
            
        And I reorder the resources on template in "COURSE PLAN"
            | actvities                                                         | reorder        |
            | Exercise: Misused words 1 (autoscored)                            | moveToTop      |                                                     
            | LCRP1551301608988                                                 | movedownButton |
            | Glossary                                                          |  moveToEnd     |
            | LCRP1550612138614                                                 | moveUpButton   |

        Then I verify that resources are reordered in "COURSE PLAN"
            | activities                                                        | orderNumber    |
            | LCRP1550612138614                                                 |  1             |                                                       
            | Exercise: Misused words 1 (autoscored)                            |  2             |
            | LCRP1551301608988                                                 |  3             |
            | Glossary                                                          |  4             |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           |   folderName                 |  message                                                                             |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |  Assesment folder            |  'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |
            | LCRP1551301608988                             | Learning Curve    |  Learning Curve folder       |  'LCRP1551301608988' was successfully moved to Learning Curve.                         |
            | Glossary                                      | Reading           |  Reading folder              |  'Glossary' was successfully moved to Reading.                                       |
            | LCRP1550612138614                             | ReadandPractice   |  ReadandPractice folder      |  'LCRP1550612138614' was successfully moved to ReadandPractice.                      |

        Then I verify the activities are added in folders which are present in "COURSE PLAN"
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | LCRP1551301608988                             | Learning Curve    |
            | Glossary                                      | Reading           |
            | LCRP1550612138614                             | ReadandPractice   |

        When I delete the resources from the Template in "COURSE PLAN"
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Learning Curve    | 'Learning Curve' has been removed.      |
            | Assesment         | 'Assesment' has been removed.           |
            | ReadandPractice   | 'ReadandPractice' has been removed.     |

        Then I verify that resources are deleted from Template in "COURSE PLAN"
            | folders           |
            | Reading           |  
            | Learning Curve    |
            | Assesment         |
            | ReadandPractice   |



 
        