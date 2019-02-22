Feature: Hatchling Item added To Assignment on Creation
  Scenario: For Empty Assignments when I click "Create My Own" and create a Hatchling Item, I should see that item in the assignment list
    Given I have opened "sapling" "login"
      And I have logged into Sapling as "raptoradmin" with password "fasterthansixmill"
      And I have opened "sapling" "empty_activity"
      And I click on "assessment" system "activity_editor" feature "create_hatchling_button" element
      And I click on "assessment" system "activity_editor" feature "hatchling_multiple_choice_button" element
    
    When I submit a hatchling "multiple_choice" item
      Then I verify "assessment" system "activity_editor" feature "multiple_choice_container" element does not exist
      And I verify "assessment" system "activity_editor" feature "assignment_item_row" element exists
