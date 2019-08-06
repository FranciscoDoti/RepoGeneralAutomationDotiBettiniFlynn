@Smoke
Feature: Administrator Tools

    Scenario: Verify that Admin is able to download course report

        Given I login to Achieve-CW as "admin_1"
        When I generate and export course report 
        Then I verify the report is dowloaded with following data
            | ColumnName                    |
            | lcrp                          |
            | lc                            |
            | lcrp                          |
            | Product Model                 |
            | pathfinder                    |
            | staticfile                    |
            | reading                       |
            | url                           |
