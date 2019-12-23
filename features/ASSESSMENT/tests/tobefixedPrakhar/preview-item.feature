@Assessment @PreviewItem @Smoke
Feature: Preview item feature

    Scenario Outline: Preview Item
        Given I login to AMS as "all-permissions-author"
        When I add the <Module Type> draft item in AMS with title <Title>
        And I add the following feedbacks and save the item
            | Tab Name  | Feedback Text  |
            | Question  | Question text  |
            | Correct   | Correct text   |
            | Incorrect | Incorrect text |
            | Default   | Default text   |

        Then I verify the feedbacks in the following tabs
            | Tab Name           | Feedback Text  |
            | Question View      | Question text  |
            | Solution           | Correct text   |
            | Incorrect Feedback | Incorrect text |
            | Default Feedback   | Default text   |

        Examples:
            | Title                    | Module Type       |
            | PreviewItem Test MC Item | Multiple Choice   |
            | PreviewItem Test MS Item | Multiple Select   |
            | PreviewItem Test UT Item | Ungraded Text     |
            | PreviewItem Test MD Item | Molecular Drawing |