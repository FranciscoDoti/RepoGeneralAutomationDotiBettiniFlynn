@Assessment @Raptor
Feature: To create and configure a Ranking raptor item

    @Ranking @Emiliano
    Scenario: Admin creates and configures a Ranking Raptor item and verifies in AMS

        Given I login to AMS as "all-permissions-author"
        When I create a non-performance module in AMS with the following details
            | Title                  | Module Type |
            | NGA QA Ranking Content | Ranking     |
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
        And I configure the Correct Context
        And I configure the Default Context
        And I save the project, Check my work and click on Submit Answer button
        Then I am shown the Default context and I see "Default" in the feedback panel at page bottom