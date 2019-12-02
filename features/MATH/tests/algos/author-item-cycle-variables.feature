@math @algo
Feature: Author loads raptor item and cycles variables

  Scenario Outline: Author loads existing Raptor item <itemId> and cycles variables without triggering algo init error

    Given I login to AMS as "all-permissions-author"

    When I am on the AMS page and search for the item id <itemId>
    Then I verify the algos are rendered in the text module

    When I click Cycle Variables
    Then I verify the algos are rendered in the text module

    Examples:
    | itemId  |
    | "25336" |
    | "74702" |
