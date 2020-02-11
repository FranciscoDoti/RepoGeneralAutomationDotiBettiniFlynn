@Assessment @SortingItem @Smoke
Feature: Verify Sorting raptor item

    Scenario: Verify Creating a Sorting Item and adding contexts
        Given I login to AMS as "all-permissions-author"
        When I add the "Sorting" module
        And I configure the following item details
            | Title                |
            | Sorting Raptor Item |
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
        # Then I drag the following token into the following respetive bins
        #     | Token        | Bin        |
        #     | First Token  | First Bin  |
        #     | Second Token | Second Bin |
        #     | Third Token  | Third Bin  |

