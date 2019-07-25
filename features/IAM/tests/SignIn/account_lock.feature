Feature: Account is locked with three inavlid account details

    Scenario: Verify that after 3 failure attempt to login account is locked for 15 minutes
        Given I have opened Achieve "signURL"
        When I login with invalid credentials and I verify the message
            | Username                      | Password  | verify                                                    |
            | admin@local-mml.cloud         |  ABCdef   | "Invalid username or password"                            |
            | admin@local-mml.cloud         |  ABCdef   | "Invalid username or password"                            |
            | admin@local-mml.cloud         |  ABCdef   | "Too many login attempts. Wait 15 minutes and try again"  |

        And I verify that I am able to login with correct credentials as "admin_1"

        
