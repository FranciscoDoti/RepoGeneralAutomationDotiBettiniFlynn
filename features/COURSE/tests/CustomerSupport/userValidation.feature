@Course @Smoke
Feature: Validating the user
  
    Scenario:  Verify that customer support is able to check account of the user

        Given I login to Achieve-CW as "customer_support_1"
        When I check the account of "student_1"
        Then I verify that "student_1" details
           | name           | Id        |
           | media_editor_1 | Id        |

