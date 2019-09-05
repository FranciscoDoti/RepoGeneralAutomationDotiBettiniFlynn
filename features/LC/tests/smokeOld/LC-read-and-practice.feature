@LearningCurve
Feature: Learning Curve Read and Practice Assignment

Scenario: Students Takes and Retakes LCRP Assignment 
    Given I start a new course as "student1"
    And I start a new assignment as "student1"
    And I log into an assignment in "LCRPUrl" as "student1"
        Then I check accessibility on "LCRP Student Landing Page" page

    When I view the student landing page for LCRP
    And I click on a reading the ebook view opens
        Then I check accessibility on "LCRP Student Book Read View" page

    When I read the rest of the ebooks the quiz button is shown
        Then I can start the assessment "LCRP"

    Given I see a question, I can answer it "Correct"
    And I see a question, I can answer it "Wrong"
    And I see a question, I can open the ebook
    And I see a question, I can answer it "Wrong"
        Then I complete 50% of the assignment
        And I complete 100% of an LCRP assignment
        And I check accessibility on "LCRP Student Completed Assignment View" page

    When I am done with an assessment, I see my score and can retake the assessment
        Then I retake the assignment as "student1"
        And I complete 50% of the assignment
        And I complete 100% of an LCRP assignment

    Given I log into an assignment in "LCRPUrl" as "instructor"
        Then I verify the students info is correct for LCRP
        And I verify the class average for "LCRP"

    Given I log into an assignment in "LCRPUrl" as "student2"
        When I view the student landing page for LCRP
        And I click on a reading the ebook view opens
        And I read the rest of the ebooks the quiz button is shown
            Then I can start the assessment "LCRP"

    Given I see a question, I can answer it "Correct"
    And I see a question, I can open the ebook
    And I see a question, I can answer it "Wrong"
    And I see a question, I can answer it "Wrong"
    And I see a question, I can answer it "Wrong"
    And I see a question, I can answer it "Wrong"
    And I see a question, I can answer it "Wrong"
    And I see a question, I can answer it "Wrong"
        Then I complete 50% of the assignment
        And I see a question, I can answer it "Wrong"
        And I see a question, I can answer it "Wrong"
        And I see a question, I can answer it "Wrong"
        And I see a question, I can answer it "Wrong"
        And I see a question, I can answer it "Wrong"
        And I see a question, I can answer it "Wrong"
        And I complete 100% of an LCRP assignment
#  When I am done with an assessment, I see my score and can retake the assessment

    Given I log into an assignment in "LCRPUrl" as "instructor"
        Then I check accessibility on "LCRP Instructor Page" page
        Then I verify the class average for "LCRP"

Scenario: Student Partially Completes Assignment, using hints
    Given I start a new assignment as "student1"
    And I log into an assignment in "LCRPUrl" as "student1"
        When I view the student landing page for LCRP
        And I click on a reading the ebook view opens
        And I read the rest of the ebooks the quiz button is shown
            Then I can start the assessment "LCRP"
            And I answer questions until I get a MathJax hint

Scenario: Instructor Validates Trends and Insights Page after Students complete assignments
    Given I start a new assignment as "student1"
    And I log into an assignment in "LCRPUrl" as "student1"
        When I view the student landing page for LCRP
        And I click on a reading the ebook view opens
        And I read the rest of the ebooks the quiz button is shown
            Then I can start the assessment "LCRP"

    Given I see a question, I can answer it "Correct"
    And I see a question, I can answer it "Wrong"
    And I see a question, I can open the ebook
        Then I complete 50% of the assignment
        And I complete 100% of an LCRP assignment

    When I am done with an assessment, I see my score and can retake the assessment
        Then I can look at Trends and Insights, as a student
        Then I check accessibility on "LCRP Students Trends and Insights Page" page

    Given I log into an assignment in "LCRPUrl" as "instructor"
        Then I verify the students info is correct for LCRP
        And I verify the class average for "LCRP"
        And I can look at Trends and Insights, as an instructor
        And I check accessibility on "LCRP Instructor Trends and Insights Page" page

