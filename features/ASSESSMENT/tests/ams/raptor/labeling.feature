@Assessment @AMS @Smoke @Labeling
Feature: Labeling module tests

    @CreateLabeling
    Scenario: Create a labeling module
        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title        | Module Type |
            | LabelingItem | Labeling    |
        And I verify the details of the following items are displayed in AMS
            | Author Mode | Title        | Topic | Taxonomy      | Difficulty | Status      | Access | Module Type |
            | Raptor      | LabelingItem |       | Question Bank | medium     | in progress | public | LA          |




