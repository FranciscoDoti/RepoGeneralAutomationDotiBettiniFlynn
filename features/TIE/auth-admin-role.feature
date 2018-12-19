Feature: Authentication for Achieve Admin via IAM

    Background:
        Given I have opened Achieve "loginURL"
        And I have logged in as "admin"

    Scenario Outline: Admin able to revoke and then grant a specified role to a newly created user
        When I elect to manage the role of user <email_address>
         the role of <role>
        When I elect to manage the role of user <email_address>
        When I grant the role of <role>
        #Then Verify Successful permission grant message
        And I sign out of Achieve
        Examples:
        |email_address   |role                |
        |admin_alt       | Admin              |
        #|customer_support| "Customer Support" |
        #|media_producer  | "Media Producer"   |
        #|instructor_1    | "Instructor"       |
        # |testuser+ad05@gmail.com                  | "Paid Access Code Creator"  |

##Change the emails to what ever you are using.
