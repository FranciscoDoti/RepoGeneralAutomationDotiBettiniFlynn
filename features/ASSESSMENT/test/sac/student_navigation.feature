Feature: Student opens SAC assignment
  Scenario: Student is able to direct navigate questions in sac

    Given I have opened "sapling" "login"
      And I have logged into Sapling as "raptorstudent" with password "fasterthansixmill"
      And I have opened "sapling" "student_sac"
      And I sleep "2" seconds
      And I click on "assessment" system "sac" feature "side_nav_item_3" element
      And I sleep "2" seconds

    Then I verify "assessment" system "sac" feature "side_nav_list_title" element's "side_nav_list_title_text" message is displayed on the page
