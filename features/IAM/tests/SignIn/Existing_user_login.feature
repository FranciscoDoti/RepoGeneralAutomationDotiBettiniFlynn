Feature: Existing user can sigin into the account before deployemnet

    Scenario Outline: Verify that Existing registered account before deployment can Sign In appropriately

        Given I have opened Achieve "signURL"
        When I have logged in as "media_producer_1" 

        Then I <verify> that I am able to login in as existing user before deployement.

            Examples:
            |   verify            |
            |   "Media Producer"  |