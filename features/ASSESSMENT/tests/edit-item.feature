@Assessment @AMS @EditItem
Feature: To create and update a single raptor items in AMS

    Scenario: Instructor creates and updates a single item in AMS

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title               | Module Type     |
            | NGA QA Test MC Item | Multiple Choice |

        And I update items by title with the following details in AMS
            | Title               | Topic Level1 | Topic Level2 | Topic Level3         | Topic Level4 | Topic Level5                   | Taxonomy Level1 | Taxonomy Level2 | Difficulty | Status | Access |
            | NGA QA Test MC Item | Algebra      | Math Review  | CHAPTER 0 All Topics | All Topics   | Your Questions (uncategorized) | Algebra         | Math Review     | Easy       | Live   | public |

        Then I verify the details of the following items are displayed in AMS
            | Author Mode | Title               | Topic                          | Taxonomy    | Difficulty | Module Type | Status | Access |
            | Raptor      | NGA QA Test MC Item | Your Questions (uncategorized) | Math Review | easy       | MC          | live   | public |
