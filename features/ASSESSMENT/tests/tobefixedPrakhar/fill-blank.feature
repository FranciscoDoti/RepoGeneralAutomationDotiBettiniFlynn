@Assessment @fillInTheBlank @Smoke
Feature: To configure a fill-in-the-blanks raptor item

  Scenario: User creates a new fill-in-the-blanks raptor item, configures it and grades it

    Given I login to AMS as "all-permissions-author"
    When I add the "Fill In The Blank" module
    And I add a dropdown with text "Test " and the following options
      | Option |
      | 1      |
      | 2      |
    And I configure the following item details
      | Title                          |
      | NGA QA Passage Completion test |
    And I set correct answer "2" for FB
    Then I check FB answer
