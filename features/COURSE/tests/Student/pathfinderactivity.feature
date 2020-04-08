@Smoke @Course @Flaky @API
Feature: Student compelets Pathfinder Activity

    
    @delete-Courses
    Scenario: Verify that Student Takes Practice Test 

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id            | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Pathfinder Template                 | E2E 301    | topics | draft  | 4                | true               | 0050n000002Wt0kAAC  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |   1               |
        
                       
        And I click on "COURSE TEMPLATES" tab
        And I click on "Pathfinder Template" card
        And I click on "Production" Tab 

        And I add activities by "Search" and add to content library 
           | activities                                                  | addContent                                       |
           | Practice Test for Reading Skills - English v2               | Practice Test for Reading Skills - Engli ...     |    
           | Complete the Study Plan for Reading Skills - English v2     | Complete the Study Plan for Reading Skil ...     |
           |  Final Test for Reading Skills - English v2                 | Final Test for Reading Skills - English  ...     |

        And I copy course from "Pathfinder Template" as "media_producer_2" with the following data
            | name               | short_name | c_account   | is_course_template | course_term | course_year | status | course_type | isbn          | warn_prebuilt | enrollment_start_date | course_end_date   |
            | Pathfinder Course  | E2E 301    | null        | false              | spring      | 2020        | active | course      | 9781464199498 | false         |  todaydate            |  After3Months     |               


        And I sign out of Achieve

        And I assign instructor to "Pathfinder Course" as a "customer_support_1"
            |   id     |   enrollments         | product_model_id  | course_type    |
            |   id     |   instructor_1        |   4               | course         |
        
         And I login to Achieve-CW as "instructor_1"
    

        And I add the activities by searching in browse and adding it to courseplanner in "Pathfinder Course" course
           | activities                                                  | addContent                                       |
           | Practice Test for Reading Skills - English v2               | Practice Test for Reading Skills - Engli ...     |    
           | Complete the Study Plan for Reading Skills - English v2     | Complete the Study Plan for Reading Skil ...     |
           |  Final Test for Reading Skills - English v2                 | Final Test for Reading Skills - English  ...     |


        And I close the popup message

        And I assign the activities in courseplanner
            | activity                                                    | Points |
            | Practice Test for Reading Skills - Engli ...                | 5      |    
            | Complete the Study Plan for Reading Skil ...                | 5      |
            | Final Test for Reading Skills - English  ...                | 5      |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1" 
        And I enroll the "student_1" in "Pathfinder Course" course
        And I sign out of Achieve
        And I login to Achieve-CW as "student_1" 
        When I click on "Pathfinder Course"
        And I launch the Pathfinder Assignment "Practice Test for Reading Skills - Engli ..."
        And I click on the "Start Test Button" on the "studentAssignment" page
        And I complete an NGA assignment with the following answers
            |Question  |Answer  |
            | 1        | 1      |
            | 2        | 2      |
            | 3        | 1      |
            | 4        | 4      |
            | 5        | 4      |
            | 6        | 3      |
            | 7        | 1      |
            | 8        | 3      |
            | 9        | 1      |
            | 10       | 1      |
            | 11       | 3      |
            | 12       | 2      |
            | 13       | 2      |
            | 14       | 2      |
            | 15       | 1      |
            | 16       | 1      |
            | 17       | 2      |
            | 18       | 4      |
            | 19       | 3      |
            | 20       | 1      |
        Then there should be a "Continue to Results Button" on the "secondaryHeader" page

        When I refresh the page
        Then there should be a "Practice Test Results Summary" that includes the text "Nice! You tested out of every topic!" on the "studentAssignment" page
        And the topic report card for "Topic Sentences and Supporting Details" should have the score "5/5"
        And the topic report card for "Vocabulary" should have the score "5/5"
        And the topic report card for "Patterns of Organization" should have the score "5/5"
        And the topic report card for "Topics and Main Ideas" should have the score "5/5"

    
        And I launch the Pathfinder Assignment "Complete the Study Plan for Reading Skil ..."
        Then there should be a "Student Tested Out Message" that includes the text "Nice! You tested out of the study plan for Reading Skills." on the "studentAssignment" page
        And I launch the Pathfinder Assignment "Final Test for Reading Skills - English  ..."
        And I click on the "Start Test Button" on the "studentAssignment" page
        And I complete an NGA assignment with the following answers
            |Question  |Answer |
            | 1        | 4     |
            | 2        | 3     |
            | 3        | 1     |
            | 4        | 2     |
            | 5        | 3     |
            | 6        | 2     |
            | 7        | 1     |
            | 8        | 4     |
            | 9        | 3     |
            | 10       | 4     |
            | 11       | 2     |
            | 12       | 1     |
            | 13       | 3     |
            | 14       | 4     |
            | 15       | 3     |
            | 16       | 1     |
            | 17       | 1     |
            | 18       | 3     |
            | 19       | 4     |
            | 20       | 3     |

        And I refresh the page
        Then there should be a "Final Test Results Summary" that includes the text "Excellent! You have completed the final test." on the "studentAssignment" page

        Then I verify the activity status for the following activities in "COURSE PLAN"
            | activity                                          | status    |
            | Practice Test for Reading Skills - Engli ...      | Complete  |
            | Complete the Study Plan for Reading Skil ...      | Complete  |
            | Final Test for Reading Skills - English  ...      | Complete  |

        And I verify the activity status for the following activities in "ASSIGNMENTS"
            | activity                                          | status    |
            | Practice Test for Reading Skills - Engli ...      | Complete  |
            | Complete the Study Plan for Reading Skil ...      | Complete  |
            | Final Test for Reading Skills - English  ...      | Complete  |


        And I click on "Pathfinder Course"

        Then I verify the assignmenent grades in gradebook for below assigned activities 
            | activity                                          | percentage  | points  | PercentOfTotalgrades |
            |  Practice Test for Reading Skills - Engli ...     |   100%      | 5       | 33%                  |
            | Complete the Study Plan for Reading Skil ...      |   100%      | 5       | 33%                  |
            | Final Test for Reading Skills - English  ...      |   100%      | 5       | 33%                  |
