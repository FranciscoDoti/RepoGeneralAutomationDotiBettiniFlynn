@IAM
Feature: Account is locked with three inavlid account details

    Scenario: Verify that after 2 failure attempt to login account is locked for 15 minutes
        
        Given I have opened "Achieve-CW"
        When I login with invalid credentials and I verify the message
            
            | Username                      | Password  | Message                                                   |
            | admin@local-mml.cloud         |  ABCdef   | "Invalid username or password"                            |
            | admin@local-mml.cloud         |  ABCdef   | "Invalid username or password"                            |
            | admin@local-mml.cloud         |  ABCdef   | "Too many login attempts. Wait 15 minutes and try again"  |

        When I login with correct credentials as "admin_1" 
        Then I verify the user login
            |   UserName  |
            |   Addy min  |

        
