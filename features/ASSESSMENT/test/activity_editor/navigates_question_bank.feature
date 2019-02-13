Feature: On Empty Assignment View, if I click question button

Scenario: If I click on question bank button, I go to questionbank
   Given I have opened "sapling" "login"
      And I have logged into Sapling as "raptoradmin" with password "fasterthansixmill"
      And I have opened "sapling" "empty_activity"
   
   When I click on "assessment" system "activity_editor" feature "question_bank_button" element

   Then I verify the uri "sapling" "sapling_base_question_bank" for the "current" window