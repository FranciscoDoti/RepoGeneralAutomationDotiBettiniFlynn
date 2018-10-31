Feature: Learning Curve Classic Assignment

Scenario: Student Takes a LC Assessment
Given I start a new course as "student2"
Given I start a new assignment as "student2"
Given I log into an assignment in "LCUrl" as "student2"
When I view the student landing page for LC
Then I can start the assessment "LC"
Given I see a question, I can answer it "Correct"
And I see a question, I can answer it "Wrong"
And I see a question, I can open the ebook
Then I complete 50% of the assignment
Then I complete 100% of an LC assignment
Given I log into an assignment in "LCUrl" as "instructor"

Scenario: Student Takes a LC Assessment
Given I start a new assignment as "student2"
Given I log into an assignment in "LCUrl" as "student2"
When I view the student landing page for LC
Then I can start the assessment "LC"
Given I see a question, I can answer it "Correct"
And I see a question, I can answer it "Wrong"
And I see a question, I can open the ebook
Then I complete 50% of the assignment
Then I complete 100% of an LC assignment
Given I log into an assignment in "LCUrl" as "instructor"