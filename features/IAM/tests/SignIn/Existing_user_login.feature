@IAM
Feature: Existing user can sigin into the account before deployemnet

    Scenario: Verify that Existing registered account before deployment can Sign In appropriately

        Given I have opened "Achieve-CW"
        When I login with correct credentials as "media_producer_1"

        Then I verify the user login
            | UserName          |
            | Greeshma Papasani |