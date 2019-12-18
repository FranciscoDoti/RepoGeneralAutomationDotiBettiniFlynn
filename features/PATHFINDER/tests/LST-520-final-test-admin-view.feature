@SetScreenSize
@Pathfinder
@admin
Feature: Test the basic functionality of the admin view of a final test

    Scenario: An admin launches a final test and sees the admin view of the final test page
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Admin Automation Template" and click on course card
            When I launch the Pathfinder Assignment "Final Test for Expressions"
                Then there should be a "Results Button" on the "instructorAssignment" page
                Then there should be a "Final Test Student Preview Link" on the "instructorAssignment" page
                Then there should be a "Activity Editor Link" on the "instructorAssignment" page
                Then there should be a "Change Grading Settings Button" on the "instructorAssignment" page
                Then there should be a "Late Penalty Button" on the "instructorAssignment" page

    Scenario: An admin can preview the final test as a student
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Admin Automation Template" and click on course card
            When I launch the Pathfinder Assignment "Final Test for Expressions"
            When I click on the "Final Test Student Preview Link" on the "instructorAssignment" page
                Then the user should be taken to a student preview

    Scenario: An admin can get to the activity editor for the final test
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Admin Automation Template" and click on course card
            When I launch the Pathfinder Assignment "Final Test for Expressions"
            When I click on the "Activity Editor Link" on the "instructorAssignment" page
                Then the user should be taken to the activity editor

    Scenario: An admin can toggle the grading settings between performance and completion
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Admin Automation Template" and click on course card
            When I launch the Pathfinder Assignment "Final Test for Expressions"
            When I change the grading setting to completion
                Then there should be a "Final Test Grading Settings Container" that includes the text "Completion" on the "instructorAssignment" page
            When I change the grading setting to performance
                Then there should be a "Final Test Grading Settings Container" that includes the text "Performance" on the "instructorAssignment" page

    Scenario: An admin can set a late penalty
        Given I login to Achieve-CW as "pf-admin"
            When I search for "Pathfinder Admin Automation Template" and click on course card
            When I launch the Pathfinder Assignment "Final Test for Expressions"
            When I set a late penalty
                Then there should be a "Final Test Grading Settings Container" that includes the text "Cumulative Late Penalty" on the "instructorAssignment" page
            When I set no late penalty
                Then there should be a "Final Test Grading Settings Container" that includes the text "No Late Penalty" on the "instructorAssignment" page
