Feature: Administrator Tools

    @smoketest
    Scenario: Verify that Admin is able to download course report

        Given I login to Achieve-CW as "admin_1"
        When I generate and export course report
