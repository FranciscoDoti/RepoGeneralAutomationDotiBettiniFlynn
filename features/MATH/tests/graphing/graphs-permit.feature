@math @graph @graph-permit @smoke
Feature: User with/without graphing permission

    Scenario: User with graphing permission have access to Graphs

        Given I login to AMS as "all-permissions-author"
        And I verify the new Graphs tab exists

    Scenario: User without graphing permission do not have access to Graphs

        Given I login to AMS as "non-graph-user"
        And I verify that Graphs tab does not exist