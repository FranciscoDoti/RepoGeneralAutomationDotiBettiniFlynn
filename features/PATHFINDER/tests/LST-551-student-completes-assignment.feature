@SetScreenSize
@Pathfinder
@student
Feature: Student Completes A Pathfinder Activity And Gets Every Question Correct

    Scenario: Producer copies course
        Given I login to Achieve-CW as "pf-producer"
            When I copy course from the "Pathfinder Producer Template" template with the following data
            | courseName                 | courseCode |
            | PF Automation Student Test | E2E 301    |
            When I activate "PF Automation Student Test" course with following data
            | field          | value                      |
            | courseName     | PF Automation Student Test |
            | courseCode     | E2E 301                    |
            | templateStatus | Active On Date             |

    Scenario: Admin adds student to course
        Given I login to Achieve-CW as "pf-admin"
            When I search for the course "PF Automation Student Test" and click on course card
            When I use a pre-built course
            When I click on home button to return to coursepage
            When I enroll the "pf-student1" in "PF Automation Student Test" course

    Scenario: Student Takes Practice Test
        Given I login to Achieve-CW as "pf-student1"
            When I click on the course card for "PF Automation Student Test"
            When I launch the Pathfinder Assignment "Practice Test for Reading Skills - Engli ..."
            When I click on the "Start Test Button" on the "studentAssignment" page
            When I complete an NGA assignment with the following answers
            # answer all questions correctly
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
                # Then there should be a "Continue to Results Button" on the "secondaryHeader" page

            When I refresh the page
            # When I click on the "Continue To Results Button" on the "secondaryHeader" page
                Then there should be a "Practice Test Results Summary" that includes the text "Nice! You tested out of every topic!" on the "studentAssignment" page
                Then the topic report card for "Topic Sentences and Supporting Details" should have the score "5/5"
                Then the topic report card for "Vocabulary" should have the score "5/5"
                Then the topic report card for "Patterns of Organization" should have the score "5/5"
                Then the topic report card for "Topics and Main Ideas" should have the score "5/5"

    Scenario: Student Uses Study Plan
        Given I login to Achieve-CW as "pf-student1"
            When I click on the course card for "PF Automation Student Test"
            When I launch the Pathfinder Assignment "Complete the Study Plan for Reading Skil ..."
                Then there should be a "Student Tested Out Message" that includes the text "Nice! You tested out of the study plan for Reading Skills." on the "studentAssignment" page

    Scenario: Student Takes Final Test and Answers Every Question Correctly
        Given I login to Achieve-CW as "pf-student1"
            When I click on the course card for "PF Automation Student Test"
            When I launch the Pathfinder Assignment "Final Test for Reading Skills - English  ..."
            When I click on the "Start Test Button" on the "studentAssignment" page
            When I complete an NGA assignment with the following answers
            # answer all questions correctly
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
                # Then there should be a "Continue to Results Button" on the "secondaryHeader" page

            When I refresh the page
            # When I click on the "Continue To Results Button" on the "studentAssignment" page
                Then there should be a "Final Test Results Summary" that includes the text "Excellent! You have completed the final test." on the "studentAssignment" page

    Scenario: Delete courses
        Given I login to Achieve-CW as "pf-producer"
            When I delete automation courses
