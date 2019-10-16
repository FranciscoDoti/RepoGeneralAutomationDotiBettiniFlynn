@Assessment @AMS
Feature: To delete a single raptor item in AMS

    @DeleteItem
    Scenario: Instructor creates a raotor item and deletes in AMS

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title               | Module Type       |
            | NGA QA Test MC Item | Multiple Choice   |

        And I delete the following items in AMS
            | Title               |
            | NGA QA Test MC Item |

        Then I verify the deleted items are displayed in Deleted Items screen in AMS
            | Title               |
            | NGA QA Test MC Item |

        And I verify the deleted items are not displayed in AMS
            | Title               |
            | NGA QA Test MC Item |
