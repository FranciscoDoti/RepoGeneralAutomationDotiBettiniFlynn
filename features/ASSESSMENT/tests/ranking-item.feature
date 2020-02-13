@Assessment @Raptor @Smoke
Feature: To create and configure a Ranking raptor item

    @Ranking @CreateRanking
    Scenario: Admin creates and configures a Ranking Raptor item and verifies in AMS

        Given I login to AMS as "all-permissions-author"
        When I add the "Ranking" module
        And I edit the Ranking
            | Type   | Value  |
            | Top    | Upper  |
            | Bottom | Bottom |
            | Token  | One    |
            | Token  | Two    |
            | Token  | Three  |
            | Token  | Four   |
            | Token  | Five   |
            | Token  | Six    |
            | Token  | Seven  |
        And I configure the Correct Context for Ranking
            | Value |
            | One   |
            | Two   |
            | Three |
            | Four  |
        And I add hints
            | Module Type   | Value   |
            | Ungraded Text | Correct |
        And I set the "Default" Context
            | Hint Type     | Value   |
            | Ungraded Text | Default |
        And I configure the following item details
            | Title                                |
            | NGA QA Ranking Item [release number] |
        And I click on Check Your Work and Submit Answer
        Then I Verify the Ungraded Text in current context
            | Text    |
            | Default |