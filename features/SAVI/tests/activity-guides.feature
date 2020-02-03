@SAVI
@ActivityGuides

Feature: Activity Guides
 
Background: Log into Savi Verification page
  Given I login to Savi Verification as "kelly.lancaster+savi"

Scenario: All the activity guides load at their master links
  When I navigate to the activity guide demo master link
  Then the activity guide loads

  Then all of the activity guide links can be loaded from "activityguides.json"
