@Pathfinder
@admin
Feature: Test the basic functionality of the admin view of a final test

    Scenario: An admin launches a final test and sees the admin view of the final test page
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Automation Template" and click on course card
            When I launch the Final Test for Expressions
                Then there should be a "Results Button" on the instructor assignment page
                Then there should be a "Final Test Student Preview Link" on the instructor assignment page
                Then there should be a "Activity Editor Link" on the instructor assignment page
                Then there should be a "Change Grading Settings Button" on the instructor assignment page
                Then there should be a "Late Penalty Button" on the instructor assignment page

    Scenario: An admin can preview the final test as a student
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Automation Template" and click on course card
            When I launch the Final Test for Expressions
            When I click on the "Final Test Student Preview Link" on the instructor assignment page
                Then the user should be taken to a student preview

    Scenario: An admin can get to the activity editor for the final test
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Automation Template" and click on course card
            When I launch the Final Test for Expressions
            When I click on the "Activity Editor Link" on the instructor assignment page
                Then the user should be taken to the activity editor

    Scenario: An admin can toggle the grading settings between performance and completion
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Automation Template" and click on course card
            When I launch the Final Test for Expressions
            When I click on the "Change Grading Settings Button" on the instructor assignment page
                Then there should be a "Grading Settings Save Button" on the instructor assignment page
                Then there should be a "Grading Settings Cancel Button" on the instructor assignment page
                Then there should be a "Grading Settings Performance Selected" on the instructor assignment page
                Then there should be a "Grading Settings Completion Unselected" on the instructor assignment page

            When I click on the "Grading Settings Completion" on the instructor assignment page
                Then there should be a "Grading Settings Completion Selected" on the instructor assignment page
                Then there should be a "Grading Settings Performance Unselected" on the instructor assignment page

            When I click on the "Grading Settings Save Button" on the instructor assignment page
                Then "Confirm Save Modal" should include the text "Grading setting changed."

            When I click on the "Grading Settings Changed Modal Ok Button" on the instructor assignment page
                Then "Final Test Grading Settings Container" should include the text "Completion"

# return grading setting to original state
            When I click on the "Change Grading Settings Button" on the instructor assignment page
                Then there should be a "Grading Settings Completion Selected" on the instructor assignment page
                Then there should be a "Grading Settings Performance Unselected" on the instructor assignment page

            When I click on the "Grading Settings Performance" on the instructor assignment page
                Then there should be a "Grading Settings Performance Selected" on the instructor assignment page
                Then there should be a "Grading Settings Completion Unselected" on the instructor assignment page

            When I click on the "Grading Settings Save Button" on the instructor assignment page
                Then "Confirm Save Modal" should include the text "Grading setting changed."

            When I click on the "Grading Settings Changed Modal Ok Button" on the instructor assignment page
                Then "Final Test Grading Settings Container" should include the text "Performance"

    Scenario: An admin can set a late penalty
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Automation Template" and click on course card
            When I launch the Final Test for Expressions
            When I click on the "Late Penalty Button" on the instructor assignment page
                Then there should be a "Late Penalty Save Button" on the instructor assignment page
                Then there should be a "Late Penalty Cancel Button" on the instructor assignment page
                Then there should be a "No Late Penalty Toggle Selected" on the instructor assignment page
                Then there should be a "Late Penalty Toggle Unselected" on the instructor assignment page

            When I click on the "Late Penalty Toggle" on the instructor assignment page
                Then there should be a "Late Penalty Toggle Selected" on the instructor assignment page
                Then there should be a "No Late Penalty Toggle Unselected" on the instructor assignment page

            When I click on the "Late Penalty Save Button" on the instructor assignment page
                Then "Penalty Warning Confirm Modal" should include the text "Do you want to confirm these changes?"

            When I click on the "Late Penalty Confirm Button" on the instructor assignment page
                Then "Penalty Warning Confirm Modal" should include the text "Late Penalty Changes Saved"

# this step is actually clicking on the ok button on the Late Penalty Changes Saved modal,
# but currently that button has the same id as the late penalty confirmation modal cancel button.
# This is being fixed in LST-501.
            When I click on the "Late Penalty Confirmation Modal Cancel Button" on the instructor assignment page
                Then "Final Test Grading Settings Container" should include the text "Cumulative Late Penalty"

# return late penalty to original state
            When I click on the "Late Penalty Button" on the instructor assignment page
                Then there should be a "Late Penalty Toggle Selected" on the instructor assignment page
                Then there should be a "No Late Penalty Toggle Unselected" on the instructor assignment page

            When I click on the "No Late Penalty Toggle" on the instructor assignment page
                Then there should be a "No Late Penalty Toggle Selected" on the instructor assignment page
                Then there should be a "Late Penalty Toggle Unselected" on the instructor assignment page

            When I click on the "Late Penalty Save Button" on the instructor assignment page
                Then "Penalty Warning Confirm Modal" should include the text "Do you want to confirm these changes?"

            When I click on the "Late Penalty Confirm Button" on the instructor assignment page
                Then "Penalty Warning Confirm Modal" should include the text "Late Penalty Changes Saved"

# this step is actually clicking on the ok button on the Late Penalty Changes Saved modal,
# but currently that button has the same id as the late penalty confirmation modal cancel button.
# This is being fixed in LST-501.
            When I click on the "Late Penalty Confirmation Modal Cancel Button" on the instructor assignment page
                  Then "Final Test Grading Settings Container" should include the text "No Late Penalty"
