@Assessment @SortingItem @Smoke
Feature: Verify Sorting raptor item
    Scenario: Verify Creating a Sorting Item and adding contexts
        Given I login to AMS as "all-permissions-author"
        When I add the "Sorting" module
        And I add bins with the following bin names
            | Bin        |
            | First Bin  |
            | Second Bin |
            | Third Bin  |
        And I add tokens with the following token names
            | Token        |
            | First Token  |
            | Second Token |
            | Third Token  |
            | Fourth Token |
            | Fifth Token  |
        And I drag the following token into the following respetive bins
            | Token        | Bin |
            | First Token  | 1   |
            | Second Token | 2   |
            | Third Token  | 3   |
            | Fourth Token | 3   |
            | Fifth Token  | 2   |
        And I set the following feedbacks with respect to the contexts
            | Context | Hint Type     | Value  |
            | Correct | Ungraded Text | Correct|
            | Default | Ungraded Text | Default|    
        And I configure the following item details
            | Title               |
            | Sorting Raptor Item |
        Then I check my Work for correct attempt
            | Token        | Bin |
            | First Token  | 1   |
            | Second Token | 2   |
            | Third Token  | 3   |
            | Fourth Token | 3   |
            | Fifth Token  | 2   |
