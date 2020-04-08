@Smoke @Course @flaky @API
Feature: Student attempts reading, static file, URL, Gradebook category 

    
    @delete-Courses
    Scenario: Verify that Student is able to attempt activities of a Instructor created course created from activities Template 

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | activities Template                 | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |
        
                   
        And I click on "COURSE TEMPLATES" tab
        And I click on "activities Template" card
        And I click on "Production" Tab
        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |
        And I click on go to your content
        And I add custom activity to Content Library
            | activity                                      |    
            | Google                                        |
        And I add activities to "Content Library"
          | activities                         |
          | Glossary                           |
          | SampleChapterAuto.jpg              |
          
        And I copy course from "activities Template" as "media_producer_2" with the following data
            | name               | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | activities Course  | E2E 301    | null        | false              | spring      | 2020        | active | course      | 9781464199498 | false         |  todaydate            |  After3Months     |               
        
        And I sign out of Achieve
        And I assign instructor to "activities Course" as a "customer_support_1"
            |   id     |    enrollments        | product_model_id  | course_type    |
            |   id     |   instructor_1        |   4               | course         |
        And I login to Achieve-CW as "instructor_1"
        
     
        And I add the activities in courseplanner to "activities Course" course
            | activity                                    | 
            | Google                                      |
            | Glossary                                    |
            | SampleChapterAuto.jpg                       |
        And I close the popup message

        And I assign the activities in courseplanner
            | activity                                                         | Points |
            | Google                                                           | 5      |
            | Glossary                                                         | 5      |
            | SampleChapterAuto.jpg                                            | 5      |

        And I create Gradebook Category for student and assign that to "Google" activity
            |   CategoryName        | DropGrade | GradebookCategory |
            |   Test                |  1        |   Test            |

        Then I verify that "The details of 'Google' have been updated." message is displayed
        And I close the popup message
        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1" 
        And I enroll the "student_1" in "activities Course" course  
        And I sign out of Achieve

        And I login to Achieve-CW as "student_1"

        And I click on "activities Course"

        And I attempt "Google" URL activity

        And I attempt "SampleChapterAuto.jpg" File activity

        And I complete the reading activity 
            | activity           |
            | Glossary           |

    
        Then I verify the activity status for the following activities in "COURSE PLAN"
            | activity                                      | status    |
            | Glossary                                      | Complete  |
            | Google                                        | Complete  |
            | SampleChapterAuto.jpg                         | Complete  |
        
        And I see assignments due in the next 7 days on the course Plan tab

        And I do not see assignments more than 7 days out on the course plan tab
    
        And I verify the activity status for the following activities in "ASSIGNMENTS"
            | activity                                      | status    |
            | Glossary                                      | Complete  |
            | Google                                        | Complete  |
            | SampleChapterAuto.jpg                         | Complete  |

        And I verify the assignmenent grades in gradebook for below assigned activities 
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Glossary                                      |   100%      | 5       | 50%                  |
            | Google                                        |   100%      | 5       | 100%                 |
            | SampleChapterAuto.jpg                         |   100%      | 5       | 50%                  |

        And I verify Total Grades
            | activity                                      | percentage  | points  | PercentOfTotalgrades |
            | Test Total                                    | 100%        |   5     |   33%                |
            | Assignments Total                             | 100%        |   10    |   67%                |