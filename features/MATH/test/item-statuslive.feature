Feature: Update AMS raptor item status to live 

Scenario: User opens modal window of the saved AMS raptor item and changes the status to live

  Given I login to AMS
  And I am on the AMS page and click open a saved raptor item
  And I set the item status to live
  Then I verify the item in "math" system, with "ams" feature, reflects status update in "columnStatus" element