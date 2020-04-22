@Smoke @Course @flaky @API
Feature: Student attempts reading, static file, URL, Gradebook category

    
    @delete-Courses
    Scenario: Instructor created course created from activities Template 

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                 | short_name | format | status | product_model_id | is_course_template | owner_id           | course_type | lo_framework_id                      | warn_prebuilt | isbn          |   template_version  |
            | activities Template  | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC | template    | 57ba5934-30c2-4558-b776-b4bef6954d99 | false         | 9781464199495 |   1                 |

        
        And I click on "COURSE TEMPLATES" tab
        And I click on "activities Template" card
        And I click on "Production" Tab
        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   |  randomURL  |
        Then I verify that complete icon is displayed

        When I click on go to your content

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | randomURLDisplayName                          |

        When I add custom activity to Content Library
            | activity                                      |    
            | randomURLDisplayName                          |
        
        And I add activities to "Content Library"
          | activities                                   |
          | Glossary                                     |
          | SampleChapterAuto.jpg                        |

        And I copy course from "activities Template" as "media_producer_2" with the following data
            | name               | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | activities Course  | E2E 301    | null        | false              | spring      | 2020        | active | course      | 9781464199498 | false         |  todaydate            |  After3Months     |               


        And I sign out of Achieve
        And I assign instructor to "activities Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   4               | course         |
        And I login to Achieve-CW as "instructor_1"
     
        And I add the activities in courseplanner to "activities Course" course
            | activity                                    | 
            | randomURLDisplayName                        |
            | Glossary                                    |
            | SampleChapterAuto.jpg                       |
        And I close the popup message 

        And I assign the activities in courseplanner
            | activity                                                         | Points |
            | randomURLDisplayName                                             | 5      |
            | Glossary                                                         | 5      |
            | SampleChapterAuto.jpg                                            | 5      |

        And I create Gradebook Category for student and assign that to "randomURLDisplayName" activity
            |   CategoryName        | DropGrade | GradebookCategory |
            |   Test                |  1        |   Test            |

        Then I verify that "The details of 'randomURLDisplayName' have been updated." message is displayed
        And I close the popup message
        And I sign out of Achieve

        Given I login to Achieve-CW as "customer_support_1" 
        When I enroll the student in "activities Course" course
            | students  |
            | student_1 |
            | student_2 |
        And I sign out of Achieve

        When I login to Achieve-CW as "student_1" 

        And I click on "activities Course"

        And I attempt "randomURLDisplayName" URL activity
        