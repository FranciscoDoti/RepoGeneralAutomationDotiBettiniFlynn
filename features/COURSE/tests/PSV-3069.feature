Feature: Administrator Tools

    Scenario: Verify that Admin is able to download course report

        Given I login to Achieve-CW as "admin_1"
        When I generate and export course report
        Then I verify the report has the following columns
            | ColumnNames                   |
            | NGA                           |
            | active learning               |
            | lcrp                          |
            | Product Model                 |
            | pathfinder                    |
            | writing                       |
            | staticfile                    |
            | active learning               |
            | url                           |