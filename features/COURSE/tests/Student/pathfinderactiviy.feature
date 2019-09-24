@Smoke @Course
Feature: Student compelets Pathfinder Activity

    Scenario: Verify that Student Takes Practice Test 

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Pathfinder Template   | macmillan calculus     | E2E 301      | 9781464199496  | draft         |                      

        And I activate the "Pathfinder Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Pathfinder Template    |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Pathfinder Template" template
            | type                    | activity                                                    |
            | addButtonPathfinder     | Practice Test for Reading Skills - English v2               |     
            | addButtonPathfinder     | Complete the Study Plan for Reading Skills - English v2     |
            | addButtonPathfinder     |  Final Test for Reading Skills - English v2                 |
        And I click on home button to return to coursepage
        And I copy course from the "Pathfinder Template" template with the following data
            | courseName           | courseCode           |
            | Pathfinder Course    | E2E 301              |

        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"

        And I assign "instructor_1" to the "Pathfinder Course" course
        And I sign out of Achieve
         And I login to Achieve-CW as "instructor_1"

        When I activate "Pathfinder Course" course with following data 
            | field             | value                        |
            | courseName        | Pathfinder Course            |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I add the activities in courseplanner to "Pathfinder Course" course
            | activity                                                    |
            | Practice Test for Reading Skills - English v2               |     
            | Complete the Study Plan for Reading Skills - English v2     |
            | Final Test for Reading Skills - English v2                  |

        And I assign the activities in courseplanner
            | activity                                                    | Points |
            | Practice Test for Reading Skills - English v2               |  5     |   
            | Complete the Study Plan for Reading Skills - English v2     |  5     |
            | Final Test for Reading Skills - English v2                  |  5     |
        
        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1" 
        And I enroll the "student_1" in "Qualitative Course" course
        And I sign out of Achieve
        And I login to Achieve-CW as "student_1" 
        When I click on the course card for "Pathfinder Course"
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

    #     When I refresh the page
    #     Then there should be a "Practice Test Results Summary" that includes the text "Nice! You tested out of every topic!" on the "studentAssignment" page
    #     And the topic report card for "Topic Sentences and Supporting Details" should have the score "5/5"
    #     And the topic report card for "Vocabulary" should have the score "5/5"
    #     And the topic report card for "Patterns of Organization" should have the score "5/5"
    #     And the topic report card for "Topics and Main Ideas" should have the score "5/5"

    # Scenario: Student Uses Study Plan
    #     Given I login to Achieve-CW as "pf-student1"
    #     When I click on the course card for "PF Automation Student Test"
    #     And I launch the Pathfinder Assignment "Complete the Study Plan for Reading Skil ..."
    #     Then there should be a "Student Tested Out Message" that includes the text "Nice! You tested out of the study plan for Reading Skills." on the "studentAssignment" page

    # Scenario: Student Takes Final Test and Answers Every Question Correctly
    #     Given I login to Achieve-CW as "pf-student1"
    #     When I click on the course card for "PF Automation Student Test"
    #     And I launch the Pathfinder Assignment "Final Test for Reading Skills - English  ..."
    #     And I click on the "Start Test Button" on the "studentAssignment" page
    #     And I complete an NGA assignment with the following answers
    #         |Question  |Answer |
    #         | 1        | 4     |
    #         | 2        | 3     |
    #         | 3        | 1     |
    #         | 4        | 2     |
    #         | 5        | 3     |
    #         | 6        | 2     |
    #         | 7        | 1     |
    #         | 8        | 4     |
    #         | 9        | 3     |
    #         | 10       | 4     |
    #         | 11       | 2     |
    #         | 12       | 1     |
    #         | 13       | 3     |
    #         | 14       | 4     |
    #         | 15       | 3     |
    #         | 16       | 1     |
    #         | 17       | 1     |
    #         | 18       | 3     |
    #         | 19       | 4     |
    #         | 20       | 3     |


    #     And I refresh the page
    #     Then there should be a "Final Test Results Summary" that includes the text "Excellent! You have completed the final test." on the "studentAssignment" page

    # Scenario: Delete courses
    #     Given I login to Achieve-CW as "pf-producer"
    #     When I delete automation courses