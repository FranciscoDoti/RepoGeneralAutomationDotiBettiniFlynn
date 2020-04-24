@Course @Smoke @API
Feature: Instructor adds folder, remove folder and reorders it in Qualitative Course

    
    @delete-Courses
    Scenario: Verify that Instructor is able to add folder, remove folder and reorder resources in Qualitative Course

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                 | short_name | format | status | product_model_id | is_course_template | owner_id           | course_type | lo_framework_id                      | warn_prebuilt | isbn          | template_version  |
            | Qualitative Template | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC | template    | 57ba5934-30c2-4558-b776-b4bef6954d99 | false         | 9781464199490 |   1               |
        
        And I add activities to the content library of "Qualitative Template" template
            | name                                   |
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
            
        And I reorder the resources on template in "COURSE PLAN"
            | actvities                                                         | reorder        |
            | Exercise: Misused words 1 (autoscored)                            | moveToTop      |                                                     
            | Glossary                                                          | moveToEnd      |

        Then I verify that resources are reordered in "COURSE PLAN"
            | activities                                                        | orderNumber    |                                                       
            | Exercise: Misused words 1 (autoscored)                            |  1             |
            | Glossary                                                          |  2             |      

        And I add the activities to respective folders in "COURSE PLAN"
            | activity                                      | folders           | folderName                |    message                                                                            |
            | Exercise: Misused words 1 (autoscored)        | Assesment         | Assesment folder          |   'Exercise: Misused words 1 (autoscored)' was successfully moved to Assesment.       |         
            | Glossary                                      | Reading           | Reading folder            |   'Glossary' was successfully moved to Reading.                                       |


        And I verify the activities are added in folders which are present in "COURSE PLAN"
            | activity                                      | folders           |
            | Exercise: Misused words 1 (autoscored)        | Assesment         |
            | Glossary                                      | Reading           |


        When I delete the resources from the Template in "COURSE PLAN"
            | folders           | message                                 |
            | Reading           | 'Reading' has been removed.             |
            | Assesment         | 'Assesment' has been removed.           |

        Then I verify that resources are deleted from Template in "COURSE PLAN"
            | folders           |
            | Reading           | 
            | Assesment         |



 
        