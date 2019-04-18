Feature: User with/without graphing permission

    Scenario: User with graphing permission have access to Graphs

        Given I login to AMS as "all-permissions-author" with "password"
        And I verify the new Graphs tab exists

    Scenario: User without graphing permission do not have access to Graphs

        Given I login to AMS as "non-graph-user" with "password"
        And I verify that Graphs tab does not exist