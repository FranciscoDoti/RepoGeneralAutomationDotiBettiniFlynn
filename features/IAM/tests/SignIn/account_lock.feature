Feature: Account is locked with three inavlid account details

    Scenario Outline: Verify that after 3 failure attempt to login account is locked for 15 minutes
        Given I have opened Achieve "signURL"
        When I login with invalid credentials
            Examples:
            | Username                            | Password  |
            | coursewareachieve@gmail.com         |  ABCdef   |
            | coursewareachieve@gmail.com         |  ABCdef   |
            | coursewareachieve@gmail.com         |  ABCdef   |

    #    Then I <verify> following message is displayed after 3 failure login attempts
    #        Examples:
    #        | verify                                                    |
    #        | "Too many login attempts. Wait 15 minutes and try again"  |
    #    And I verify that I am able to login with correct credentials as "admin"

        
