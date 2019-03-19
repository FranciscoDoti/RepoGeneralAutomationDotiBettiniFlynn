Feature: Student opens SAC assignment
  Scenario: Student is able to open hint panel

    Given I have opened "sapling" "login"
      And I have logged into Sapling as "raptorstudent" with password "fasterthansixmill"
      And I have opened "sapling" "student_sac"
      And I sleep "2" seconds
      And I click on "assessment" system "sac" feature "hint_button" element

    Then I verify "assessment" system "sac" feature "hint_title" element's "hint_title_text" message is displayed on the page
