Feature: Smoke Test Of Pathfinder

  Scenario: Admin Stuff
    Given I login to Achieve-CW as "admin_1"
    Given I search for "Pathfinder Automation Template" course
      When I go to course "Pathfinder Automation Template"
      When I click on the course planner tab
      When I click on the Chemistry folder
