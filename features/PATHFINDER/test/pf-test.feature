# some login data may not exist for all environments
Feature: Login to Courseware

  Scenario:An admin can copy a course from a template

    Given I login to Achieve-CW as "admin_1"
    Given I search for "Pathfinder Automation Template" course
      When I copy course from the "Pathfinder Automation Template" template with the following data
        | page_object | value |
