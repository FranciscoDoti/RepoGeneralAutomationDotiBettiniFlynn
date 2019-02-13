Feature: Int Displays No Items in Assignment when empty

   Scenario: We get an empty message for emtpy Assignments

   Given I have opened "sapling" "login"
      And I have logged into Sapling as "raptoradmin" with password "fasterthansixmill"
      And I have opened "sapling" "empty_activity"
      And I sleep "1" seconds
      And I click on "assessment" system "activity_editor" feature "assignment_tab" element

   Then I verify "assessment" system "activity_editor" feature "empty" element's "empty_assignment_message" message is displayed on the page
