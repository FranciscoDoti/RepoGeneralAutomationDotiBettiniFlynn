@Pathfinder
@student
Feature: Student Completes A Pathfinder Activity And Gets Every Question Correct

    Scenario: Producer copies course and assigns instructor role to pf-instructor
        Given I login to Achieve-CW as "pf-producer"
            When I copy course from the "Pathfinder Producer Template" template with the following data
            | courseName                 | courseCode |
            | PF Automation Student Test | E2E 301    |
            When I activate "PF Automation Student Test" course with following data
            | field          | value                      |
            | courseName     | PF Automation Student Test |
            | courseCode     | E2E 301                    |
            | templateStatus | Active On Date             |
            When I assign "pf-instructor" to the "PF Automation Student Test" course

    Scenario: Admin adds student to course
        Given I login to Achieve-CW as "pf-admin"
            When I enroll the "pf-student1" in "PF Automation Student Test" course

      Scenario: Instructor assigns pathfinder activites
          Given I login to Achieve-CW as "pf-instructor"
              When I click on the course card for "PF Automation Student Test"
              When I assign the activities in courseplanner
              | activity                                   | Points |
              | Practice Test For Reading Skills           | 100    |
              | Complete The Study Plan For Reading Skills | 100    |
              | Final Test For Reading Skills              | 100    |

    Scenario: Student Takes Practice Test
        Given I login to Achieve-CW as "pf-student1"
            When I click on the course card for "PF Automation Student Test"
            When I launch the Pathfinder Assignment "Practice Test for Reading Skills - Engli ..."
            When I click on the "Take Practice Test Button" on the "studentAssignment" page
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
                Then there should be a "Continue to Results Button" on the "secondaryHeader" page

            When I sleep
            When I click on the "Continue To Results Button" on the "secondaryHeader" page
                Then there should be a "Student Practice Test Report" that includes the text "Nice! You tested out of every topic!" on the "studentAssignment" page
                Then there should be a "Return to Assignment List Button" on the "studentAssignment" page
                Then there should be a "Review Practice Test Link" on the "studentAssignment" page
                # Then the Vocabulary topic should have 5/5 correct
                # Then the Patterns of Organization topic topic should have 5/5 correct
                # Then the Topics and Main Ideas topic should have 5/5 correct
                # Then the Topic Sentences and Supporting Details topic should have 5/5 correct

    # Scenario: Student Uses Study Plan
        # Given I login to Achieve-CW as "pf-student1"
            # When I search for "PF-Automation Student Test" and click on the course card
            # When I launch the English V2 Study Plan
                # Then the "Student Tested Out Message" should contain the text "Nice! You tested out of the study plan for Reading Skills."

    # Scenario: Student Takes Final Test and Answers Every Question Correctly
        # Given I login to Achieve-CW as "pf-student1"
            # When I search for "PF Automation Student Test" and click on the course card
            # When I launch the English V2 Final Test for Reading Skills
            # When I click on the "Take the Final Test Button"
            # When I complete an NGA assignment with the following answers
            # # answer all questions correctly
            # |Question  |Answer |
            # | 1        | d     |
            # | 2        | c     |
            # | 3        | a     |
            # | 4        | b     |
            # | 5        | c     |
            # | 6        | b     |
            # | 7        | a     |
            # | 8        | d     |
            # | 9        | c     |
            # | 10       | d     |
            # | 11       | b     |
            # | 12       | a     |
            # | 13       | c     |
            # | 14       | d     |
            # | 15       | c     |
            # | 16       | a     |
            # | 17       | a     |
            # | 18       | c     |
            # | 19       | d     |
            # | 20       | c     |
                # Then there should be a "Continue To Results Button"

            # When I click on the "Continue To Results Button"
                # Then there should be a "Student Final Test Report" with the text "Excellent! You have completed the final test."
                # Then the "Vocabulary Topic" should contain the text "5/5 correct"
                # Then the "Vocabulary Topic" should contain the text "Maintained Mastery"
                # Then the "Patterns of Organization Topic" should contain the text "5/5 correct"
                # Then the "Patterns of Organization Topic" should contain the text "Maintained Mastery"
                # Then the "Topics and Main Ideas Topic" should contain the text "5/5 correct"
                # Then the "Topics and Main Ideas Topic" should contain the text "5/5 correct"

    Scenario: Delete courses
        Given I login to Achieve-CW as "pf-producer"
            When I delete all automation courses
