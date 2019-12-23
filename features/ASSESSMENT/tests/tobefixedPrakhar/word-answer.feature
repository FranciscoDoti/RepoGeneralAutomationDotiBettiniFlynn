@Assessment @WordAnswer @Smoke
Feature: To configure a Word Answer raptor item

  Scenario: User creates a new Word Answer raptor item and configures it

    Given I login to AMS as "all-permissions-author"
    When I add the "Word Answer" module
    And I configure the following item details
      | Title                          |
      | WordAnswer Module test |

    And I configure the following grading options
      | Option        | Value |
      | Ignore Spaces | false |
      | Ignore Case   | false |

    And I add the following word choices
      | Word      |
      | Macmillan |

    Then I grade the following words
      | Word      | Result   |
      | macmillan | default  |
      | Macmillan | correct1 |
