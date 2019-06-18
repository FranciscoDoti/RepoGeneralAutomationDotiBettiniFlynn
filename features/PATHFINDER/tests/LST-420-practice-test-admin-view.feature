Feature: Test the basic functionality of the admin view of a practice test

    Scenario: An admin launches a practice test and sees the admin view of the practice test page
        Given I launch the Practice Test for Expressions from the "Pathfinder Automation Template" course as "admin"
            Then there should be a "resultsButton" on the instructor assignment page
            Then there should be a "studentPreviewLink" on the instructor assignment page
            Then there should be a "activityEditorLink" on the instructor assignment page
            Then there should be a "changeGradingSettingsButton" on the instructor assignment page
            Then there should be a "latePenaltyButton" on the instructor assignment page

    Scenario: An admin can preview the practice test as a student
        Given I launch the Practice Test for Expressions from the "Pathfinder Automation Template" course as "admin"
            When I click on the "studentPreviewLink" on the instructor assignment page
                Then the user should be taken to a student preview

    Scenario: An admin can get to the activity editor for the practice test
        Given I launch the Practice Test for Expressions from the "Pathfinder Automation Template" course as "admin"
            When I click on the "activityEditorLink" on the instructor assignment page
                Then the user should be taken to the activity editor

    Scenario: An admin can toggle the grading settings between performance and completion
        Given I launch the Practice Test for Expressions from the "Pathfinder Automation Template" course as "admin"
            When I click on the "changeGradingSettingsButton" on the instructor assignment page
                Then there should be a "gradingSettingsSaveButton" on the instructor assignment page
                Then there should be a "gradingSettingsCancelButton" on the instructor assignment page
                Then there should be a "gradingSettingsPerformanceSelected" on the instructor assignment page
                Then there should be a "gradingSettingsCompletionUnselected" on the instructor assignment page

            When I click on the "gradingSettingsCompletion" on the instructor assignment page
                Then there should be a "gradingSettingsCompletionSelected" on the instructor assignment page
                Then there should be a "gradingSettingsPerformanceUnselected" on the instructor assignment page

            When I click on the "gradingSettingsSaveButton" on the instructor assignment page
                Then "pathfinderModal" should include the text "Grading setting changed."

            When I click on the "gradingSettingsChangedModalOkButton" on the instructor assignment page
                Then "preTestGradingSettingsContainer" should include the text "Completion"

# return grading setting to original state
            When I click on the "changeGradingSettingsButton" on the instructor assignment page
                Then there should be a "gradingSettingsCompletionSelected" on the instructor assignment page
                Then there should be a "gradingSettingsPerformanceUnselected" on the instructor assignment page

            When I click on the "gradingSettingsPerformance" on the instructor assignment page
                Then there should be a "gradingSettingsPerformanceSelected" on the instructor assignment page
                Then there should be a "gradingSettingsCompletionUnselected" on the instructor assignment page

            When I click on the "gradingSettingsSaveButton" on the instructor assignment page
                Then "pathfinderModal" should include the text "Grading setting changed."

            When I click on the "gradingSettingsChangedModalOkButton" on the instructor assignment page
                Then "preTestGradingSettingsContainer" should include the text "Performance"

    Scenario: An admin can set a late penalty
        Given I launch the Practice Test for Expressions from the "Pathfinder Automation Template" course as "admin"
            When I click on the "latePenaltyButton" on the instructor assignment page
                Then there should be a "latePenaltySaveButton" on the instructor assignment page
                Then there should be a "latePenaltyCancelButton" on the instructor assignment page
                Then there should be a "noLatePenaltyToggleSelected" on the instructor assignment page
                Then there should be a "latePenaltyToggleUnselected" on the instructor assignment page

            When I click on the "latePenaltyToggle" on the instructor assignment page
                Then there should be a "latePenaltyToggleSelected" on the instructor assignment page
                Then there should be a "noLatePenaltyToggleUnselected" on the instructor assignment page

            When I click on the "latePenaltySaveButton" on the instructor assignment page
                Then "pathfinderModal" should include the text "Do you want to confirm these changes?"

            When I click on the "latePenaltyConfirmButton" on the instructor assignment page
                Then "pathfinderModal" should include the text "Late Penalty Changes Saved"

# this step is actually clicking on the ok button on the Late Penalty Changes Saved modal,
# but currently that button has the same id as the late penalty confirmation modal cancel button.
# This is being fixed in LST-501.
            When I click on the "latePenaltyConfirmationModalCancelButton" on the instructor assignment page
                Then "preTestGradingSettingsContainer" should include the text "Cumulative Late Penalty"

# return late penalty to original state
            When I click on the "latePenaltyButton" on the instructor assignment page
                Then there should be a "latePenaltyToggleSelected" on the instructor assignment page
                Then there should be a "noLatePenaltyToggleUnselected" on the instructor assignment page

            When I click on the "noLatePenaltyToggle" on the instructor assignment page
                Then there should be a "noLatePenaltyToggleSelected" on the instructor assignment page
                Then there should be a "latePenaltyToggleUnselected" on the instructor assignment page

            When I click on the "latePenaltySaveButton" on the instructor assignment page
                Then "pathfinderModal" should include the text "Do you want to confirm these changes?"

            When I click on the "latePenaltyConfirmButton" on the instructor assignment page
                Then "pathfinderModal" should include the text "Late Penalty Changes Saved"

# this step is actually clicking on the ok button on the Late Penalty Changes Saved modal,
# but currently that button has the same id as the late penalty confirmation modal cancel button.
# This is being fixed in LST-501.
            When I click on the "latePenaltyConfirmationModalCancelButton" on the instructor assignment page
                  Then "preTestGradingSettingsContainer" should include the text "No Late Penalty"
