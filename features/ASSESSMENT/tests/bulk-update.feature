@Assessment @AMS @BulkUpdate
Feature: To update multiple raptor items in AMS by bulk update

    @BulkUpdateEdit
    Scenario: Instructor updates several items at once by bulk update

        Given I login to AMS as "all-permissions-author"
        When I add the following draft Raptor items in AMS
            | Title               | ModuleType        | ModuleTypeAcronym |
            | NGA QA Test MC Item | Multiple Choice   | MC                |
            | NGA QA Test MS Item | Multiple Select   | MS                |
            | NGA QA Test UT Item | Ungraded Text     | UT                |
            | NGA QA Test MD Item | Molecular Drawing | MD                |

        And I select the created items in AMS

        And I update the selected items with the following details
            | TopicLevel1 | TopicLevel2 | TopicLevel3          | TopicLevel4 | TopicLevel5                    | TaxonomyLevel1 | TaxonomyLevel2 | Difficulty | Status | Access |
            | Algebra     | Math Review | CHAPTER 0 All Topics | All Topics  | Your Questions (uncategorized) | Algebra        | Math Review    | Easy       | Live   | public |

        Then I verify the items were updated in AMS
            | AuthorMode | Title               | Topic                          | Taxonomy    | Difficulty | ModuleType | Status | Access |
            | Raptor     | NGA QA Test MC Item | Your Questions (uncategorized) | Math Review | easy       | MC         | live   | public |
            | Raptor     | NGA QA Test MS Item | Your Questions (uncategorized) | Math Review | easy       | MS         | live   | public |
            | Raptor     | NGA QA Test UT Item | Your Questions (uncategorized) | Math Review | easy       |            | live   | public |
            | Raptor     | NGA QA Test MD Item | Your Questions (uncategorized) | Math Review | easy       | MD         | live   | public |
