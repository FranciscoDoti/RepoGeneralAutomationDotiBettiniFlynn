@Assessment @AMS @BulkUpdate
Feature: To update and delete multiple raptor items in AMS by bulk update

    @BulkUpdateEdit
    Scenario: Instructor updates several items at once by bulk update

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title               | Module Type       |
            | NGA QA Test MC Item | Multiple Choice   |
            | NGA QA Test MS Item | Multiple Select   |
            | NGA QA Test UT Item | Ungraded Text     |
            | NGA QA Test MD Item | Molecular Drawing |

        And I select the following items by title in AMS
            | Title               |
            | NGA QA Test MC Item |
            | NGA QA Test MS Item |
            | NGA QA Test UT Item |
            | NGA QA Test MD Item |

        And I update the selected items with the following details
            | Topic Level1 | Topic Level2 | Topic Level3         | Topic Level4 | Topic Level5                   | Taxonomy Level1 | Taxonomy Level2 | Difficulty | Status | Access |
            | Algebra      | Math Review  | CHAPTER 0 All Topics | All Topics   | Your Questions (uncategorized) | Algebra         | Math Review     | Easy       | Live   | public |

        Then I verify the details of the following items are displayed in AMS
            | Author Mode | Title               | Topic                          | Taxonomy    | Difficulty | Module Type | Status | Access |
            | Raptor      | NGA QA Test MC Item | Your Questions (uncategorized) | Math Review | easy       | MC          | live   | public |
            | Raptor      | NGA QA Test MS Item | Your Questions (uncategorized) | Math Review | easy       | MS          | live   | public |
            | Raptor      | NGA QA Test UT Item | Your Questions (uncategorized) | Math Review | easy       |             | live   | public |
            | Raptor      | NGA QA Test MD Item | Your Questions (uncategorized) | Math Review | easy       | MD          | live   | public |

    @BulkUpdateDelete
    Scenario: Instructor deletes several items at once by bulk update

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title               | Module Type       |
            | NGA QA Test MC Item | Multiple Choice   |
            | NGA QA Test MS Item | Multiple Select   |
            | NGA QA Test UT Item | Ungraded Text     |
            | NGA QA Test MD Item | Molecular Drawing |

        And I select the following items by title in AMS
            | Title               |
            | NGA QA Test MC Item |
            | NGA QA Test MS Item |
            | NGA QA Test UT Item |
            | NGA QA Test MD Item |

        And I delete the selected items

        Then I verify the deleted items are displayed in Deleted Items screen in AMS
            | Title               |
            | NGA QA Test MC Item |
            | NGA QA Test MS Item |
            | NGA QA Test UT Item |
            | NGA QA Test MD Item |

        And I verify the deleted items are not displayed in AMS
            | Title               |
            | NGA QA Test MC Item |
            | NGA QA Test MS Item |
            | NGA QA Test UT Item |
            | NGA QA Test MD Item |
