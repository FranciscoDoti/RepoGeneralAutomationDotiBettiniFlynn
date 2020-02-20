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
        And I set the following feedbacks with respect to the contexts
            | Context | Hint Type     | Value   |
            | Correct | Ungraded Text | Correct |
            | Default | Ungraded Text | Default |
        And I configure the following item details
            | Title                                |
            | NGA QA Ranking Item [release number] |
        And I click on Check Your Work and Submit Answer
        Then I Verify the Ungraded Text in current context
            | Text    |
            | Default |