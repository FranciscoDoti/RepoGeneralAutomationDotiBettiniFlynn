@Assessment @AMS @BulkUpdate
Feature: To update multiple raptor items in AMS by bulk update

    @BulkUpdateEdit
    Scenario: Instructor updates several items at once by bulk update

        Given I login to AMS as "all-permissions-author"
        When I add the following draft Raptor items in AMS
            | Title               | ModuleType        |
            | NGA QA Test MC Item | Multiple Choice   |
            | NGA QA Test MS Item | Multiple Select   |
#            | NGA QA Test UT Item | Ungraded Text     |
#            | NGA QA Test MD Item | Molecular Drawing |

        And I select the created items in AMS

        And I update the selected items with the following details
            | TopicLevel1 | TopicLevel2 | TopicLevel3          | TopicLevel4 | TopicLevel5                    | TaxonomyLevel1 | TaxonomyLevel2 | Difficulty | Status | Access |
            | Algebra     | Math Review | CHAPTER 0 All Topics | All Topics  | Your Questions (uncategorized) | Algebra        | Math Review    | Easy       | Live   | public |

        Then I verify the items were updated in AMS
            | AuthorMode | Title               | Topic                          | Taxonomy    | Difficulty | ModuleType | Status | Access |
            | Raptor     | NGA QA Test MC Item | Your Questions (uncategorized) | Math Review | Easy       | MC         | Live   | public |
            | Raptor     | NGA QA Test MS Item | Your Questions (uncategorized) | Math Review | Easy       | MS         | Live   | public |
            | Raptor     | NGA QA Test UT Item | Your Questions (uncategorized) | Math Review | Easy       | UT         | Live   | public |
            | Raptor     | NGA QA Test MD Item | Your Questions (uncategorized) | Math Review | Easy       | Moldraw    | Live   | public |
