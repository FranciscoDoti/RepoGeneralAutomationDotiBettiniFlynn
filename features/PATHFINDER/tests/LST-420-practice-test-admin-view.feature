Feature: Smoke Test Of Pathfinder

  Scenario: Admin Stuff
    Given I login to Achieve-CW as "admin_1"
      When I search for "Pathfinder Automation Template" and click on course card
      When I launch the Practice Test for Expressions
