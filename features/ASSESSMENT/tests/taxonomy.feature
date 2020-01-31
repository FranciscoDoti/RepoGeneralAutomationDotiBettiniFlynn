@Assessment @AMS @Regression @Taxonomy
Feature: From AMS, I manage taxonomies

    @Topic @CreateTopic
    Scenario: From AMS, add a New Topic and Delete it

        Given I login to AMS as "all-permissions-author"
        When I access to the taxonomy page
            | Subject | Title                 | Chapter   | Section     |
            | Testing | SAVI Testing Taxonomy | Chapter 1 | Section 1.1 |
        And I create a new topic called "QA V"
        Then The new topic is displayed
        And I delete the created Topic
        And I verify the Topic is not present

    @Topic @AssignTopic
    Scenario: Create a taxonomy and assign to a new Hatchling Item

        Given I login to AMS as "all-permissions-author"
        When I add "Multiple Choice" hatchling item with following details on "AMS"
            | Question Title                     | Question Prompt       |
            | QA Hatchling MC Test Item from AMS | Who won the CWC 2019? |
        And I add the following correct answer and feedback on "AMS"
            | Answer  | Feedback |
            | England | Correct  |
        And I add the following incorrect answers and feedback on "AMS"
            | Answer      | Feedback  |
            | Australia   | Incorrect |
            | India       | Incorrect |
            | NewZealandd | Incorrect |
        And I set hint and generic feedback with following details and save on "AMS"
            | Hint                  | Generic Feedback            |
            | You Know the answers! | You must provide a response |

        When I access to the taxonomy page
            | Subject | Title                 | Chapter   | Section     |
            | Testing | SAVI Testing Taxonomy | Chapter 1 | Section 1.1 |
        And I create a new topic called "QA V"
        Then The new topic is displayed

        And I update an item by title with the following details in AMS
            | Topic Level 1 | Topic Level 2         | Topic Level 3 | Topic Level 4 | Topic Level 5 | Status |
            | Testing       | SAVI Testing Taxonomy | Chapter 1     | Section 1.1   | QA V          | Live   |
        Then I verify the item details are displayed in AMS
            | Author Mode | Topic | Status |
            | Hatchling   | QA V  | live   |

        When I access to the taxonomy page
            | Subject | Title                 | Chapter   | Section     |
            | Testing | SAVI Testing Taxonomy | Chapter 1 | Section 1.1 |
        And I delete the created Topic
        And I verify the Topic is not present