@Assessment @LabelingItem @Smoke
Feature: Verify Labeling raptor item

    Scenario: Verify Range Algo in Labeling tokens and bins
        Given I login to AMS as "all-permissions-author"
        When I add the "Labeling" module
        And I configure the following item details
            | Title                |
            | Labeling Raptor Item |
        And I add bins and check the corresponding checkboxes
        And I add 3 tokens with the following token names
            | Token        |
            | ???token1??? |
            | ???token2??? |
            | ???token3??? |
        And I add the following range algos
            | Description | Variable Name | Minimum Value | Maxmimum Value | Increment Step |
            | Range 1     | token1        | 2             | 8              | 2              |
            | Range 2     | token2        | 1000          | 5555           | 0.01           |
            | Range 3     | token3        | -40           | 40             | 0.5            |
        Then I drag "???token2???" into the bin as a correct answer and check my work


