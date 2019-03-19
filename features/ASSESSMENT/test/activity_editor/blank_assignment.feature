Feature: Int Displays No Items in Assignment when empty

   Scenario: We get an empty message for emtpy Assignments

   Given I have opened "sapling" "login"
      And I have logged into Sapling as "raptoradmin" with password "fasterthansixmill"
      And I have opened "sapling" "empty_activity"

   Then I verify "assessment" system "activity_editor" feature "new_empty" element's "empty_assignment_banner" message is displayed on the page


