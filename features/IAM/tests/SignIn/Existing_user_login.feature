Feature: Existing user can sigin into the account before deployemnet

    Scenario: Verify that Existing registered account before deployment can Sign In appropriately

        Given I have opened Achieve "Achieve-CW"
        When I have logged in as "media_producer_1" 

        Then I verify that I am able to login in as existing user before deployement.
            |   verify            |
            |   "Media Producer"  |