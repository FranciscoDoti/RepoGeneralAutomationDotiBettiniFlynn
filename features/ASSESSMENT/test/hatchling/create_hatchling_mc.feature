Feature: Hatchling Item added to Question Bank
  Scenario: When I create new MC Hatchling I see it in Question Bank

  Given I have opened "sapling" "login"
    And I have logged into Sapling as "raptoradmin" with password "fasterthansixmill"
    And I have opened "sapling" "empty_activity"
    And I sleep "4" seconds
    And I click on "assessment" system "activity_editor" feature "question_bank_tab" element
    And I click on "assessment" system "activity_editor" feature "private_questions_button" element
    And I click on "assessment" system "activity_editor" feature "add_another_button" element
    And I click on "assessment" system "activity_editor" feature "qb_hatchling_mc" element

  When I submit a hatchling "multiple_choice" item
    Then I verify "assessment" system "activity_editor" feature "multiple_choice_container" element does not exist
    And I verify "assessment" system "activity_editor" feature "item_title" element "Cucumber Test" text exists
