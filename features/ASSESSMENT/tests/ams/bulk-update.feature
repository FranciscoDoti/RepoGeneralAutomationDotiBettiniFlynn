@Assessment @AMS @BulkUpdate @Smoke
Feature: Bulk Update/Delete multiple raptor items in AMS

    @BulkUpdateEdit @WIP
    Scenario: Instructor updates several items at once by bulk update

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title                       | Module Type       |
            | BulkUpdateEdit Test MC Item | Multiple Choice   |
            | BulkUpdateEdit Test MS Item | Multiple Select   |
            | BulkUpdateEdit Test UT Item | Ungraded Text     |
            | BulkUpdateEdit Test MD Item | Molecular Drawing |

        And I select the following items by title in AMS
            | Title                       |
            | BulkUpdateEdit Test MC Item |
            | BulkUpdateEdit Test MS Item |
            | BulkUpdateEdit Test UT Item |
            | BulkUpdateEdit Test MD Item |

        And I update the selected items with the following details
            | Topic Level 1 | Topic Level 2 | Topic Level 3        | Topic Level 4 | Topic Level 5                  | Taxonomy Level 1 | Taxonomy Level 2 | Difficulty | Status | Access |
            | Algebra       | Math Review   | CHAPTER 0 All Topics | All Topics    | Your Questions (uncategorized) | Algebra          | Math Review      | Easy       | Live   | public |

            Then I verify the details of the following items are displayed in AMS
                | Author Mode | Title                       | Topic                          | Taxonomy    | Difficulty | Module Type | Status | Access |
                | Raptor      | BulkUpdateEdit Test MC Item | Your Questions (uncategorized) | Math Review | easy       | MC          | live   | public |
                | Raptor      | BulkUpdateEdit Test MS Item | Your Questions (uncategorized) | Math Review | easy       | MS          | live   | public |
                | Raptor      | BulkUpdateEdit Test UT Item | Your Questions (uncategorized) | Math Review | easy       |             | live   | public |
                | Raptor      | BulkUpdateEdit Test MD Item | Your Questions (uncategorized) | Math Review | easy       | MD          | live   | public |

    @BulkUpdateDelete
    Scenario: Instructor deletes several items at once by bulk update

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title                         | Module Type       |
            | BulkUpdateDelete Test MC Item | Multiple Choice   |
            | BulkUpdateDelete Test MS Item | Multiple Select   |
            | BulkUpdateDelete Test UT Item | Ungraded Text     |
            | BulkUpdateDelete Test MD Item | Molecular Drawing |

        And I select the following items by title in AMS
            | Title                         |
            | BulkUpdateDelete Test MC Item |
            | BulkUpdateDelete Test MS Item |
            | BulkUpdateDelete Test UT Item |
            | BulkUpdateDelete Test MD Item |

        And I delete the selected items

            Then I verify the deleted items are displayed in Deleted Items screen in AMS
                | Title                         |
                | BulkUpdateDelete Test MC Item |
                | BulkUpdateDelete Test MS Item |
                | BulkUpdateDelete Test UT Item |
                | BulkUpdateDelete Test MD Item |

        And I verify the deleted items are not displayed in AMS
            | Title                         |
            | BulkUpdateDelete Test MC Item |
            | BulkUpdateDelete Test MS Item |
            | BulkUpdateDelete Test UT Item |
            | BulkUpdateDelete Test MD Item |

    @BulkUpdateEditTwice
    Scenario: Instructor updates several items at once by bulk update twice

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title                            | Module Type       |
            | BulkUpdateEditTwice Test MC Item | Multiple Choice   |
            | BulkUpdateEditTwice Test MS Item | Multiple Select   |
            | BulkUpdateEditTwice Test UT Item | Ungraded Text     |
            | BulkUpdateEditTwice Test MD Item | Molecular Drawing |

        And I select the following items by title in AMS
            | Title                            |
            | BulkUpdateEditTwice Test MC Item |
            | BulkUpdateEditTwice Test MS Item |
            | BulkUpdateEditTwice Test UT Item |
            | BulkUpdateEditTwice Test MD Item |

        And I update the selected items with the following details
            | Topic Level 1 | Topic Level 2 | Topic Level 3        | Topic Level 4 | Topic Level 5                  | Taxonomy Level 1 | Taxonomy Level 2 | Difficulty | Status | Access |
            | Algebra       | Math Review   | CHAPTER 0 All Topics | All Topics    | Your Questions (uncategorized) | Algebra          | Math Review      | Easy       | Live   | public |

        And I verify the details of the following items are displayed in AMS
            | Author Mode | Title                            | Topic                          | Taxonomy    | Difficulty | Module Type | Status | Access |
            | Raptor      | BulkUpdateEditTwice Test MC Item | Your Questions (uncategorized) | Math Review | easy       | MC          | live   | public |
            | Raptor      | BulkUpdateEditTwice Test MS Item | Your Questions (uncategorized) | Math Review | easy       | MS          | live   | public |
            | Raptor      | BulkUpdateEditTwice Test UT Item | Your Questions (uncategorized) | Math Review | easy       |             | live   | public |
            | Raptor      | BulkUpdateEditTwice Test MD Item | Your Questions (uncategorized) | Math Review | easy       | MD          | live   | public |

        And I select the following items by title in AMS
            | Title                            |
            | BulkUpdateEditTwice Test MC Item |
            | BulkUpdateEditTwice Test MS Item |
            | BulkUpdateEditTwice Test UT Item |
            | BulkUpdateEditTwice Test MD Item |

        And I update the selected items with the following details
            | Topic Level 1        | Topic Level 2               | Topic Level 3          | Topic Level 4                            | Topic Level 5          | Taxonomy Level 1     | Taxonomy Level 2            | Difficulty | Status    | Access  |
            | Analytical Chemistry | Exploring Chemical Analysis | The Analytical Process | 0-2 General Steps in a Chemical Analysis | The Analytical Process | Analytical Chemistry | Exploring Chemical Analysis | Hard       | In Review | private |

            Then I verify the details of the following items are displayed in AMS
                | Author Mode | Title                            | Topic                  | Taxonomy                    | Difficulty | Module Type | Status    | Access  |
                | Raptor      | BulkUpdateEditTwice Test MC Item | The Analytical Process | Exploring Chemical Analysis | hard       | MC          | in review | private |
                | Raptor      | BulkUpdateEditTwice Test MS Item | The Analytical Process | Exploring Chemical Analysis | hard       | MS          | in review | private |
                | Raptor      | BulkUpdateEditTwice Test UT Item | The Analytical Process | Exploring Chemical Analysis | hard       |             | in review | private |
                | Raptor      | BulkUpdateEditTwice Test MD Item | The Analytical Process | Exploring Chemical Analysis | hard       | MD          | in review | private |
