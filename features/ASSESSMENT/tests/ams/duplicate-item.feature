@Assessment @AMS @Smoke @DuplicateItemFeature
Feature: As a user, I want to duplicate an existing item

   @DuplicateItems
   Scenario:  User creates multiple AMS raptor items and duplicates them
      Given I login to AMS as "all-permissions-author"
      When I create the following draft Raptor items in AMS
         | Title               | Module Type       |
         | DuplicateItems Test MC Item | Multiple Choice   |
         | DuplicateItems Test MS Item | Multiple Select   |
         | DuplicateItems Test UT Item | Ungraded Text     |
         | DuplicateItems Test MD Item | Molecular Drawing |
      And I verify the details of the following items are displayed in AMS
         | Author Mode | Title                       | Topic     | Taxonomy      | Difficulty   | Status      | Access | Module Type |
         | Raptor      | DuplicateItems Test MC Item |           | Question Bank | medium       | in progress | public |      MC     | 
         | Raptor      | DuplicateItems Test MS Item |           | Question Bank | medium       | in progress | public |      MS     | 
         | Raptor      | DuplicateItems Test UT Item |           | Question Bank | medium       | in progress | public |             | 
         | Raptor      | DuplicateItems Test MD Item |           | Question Bank | medium       | in progress | public |      MD     | 
      And I duplicate the following items
         | Title                       |
         | DuplicateItems Test MC Item |
         | DuplicateItems Test MS Item |
         | DuplicateItems Test UT Item |
         | DuplicateItems Test MD Item |
      Then I verify the details of the following items are displayed in AMS
         | Author Mode | Title                       | Topic     | Taxonomy      | Difficulty   | Status      | Access | Module Type |
         | Raptor      | DuplicateItems Test MC Item |           | Question Bank | medium       | in progress | public |      MC     | 
         | Raptor      | DuplicateItems Test MS Item |           | Question Bank | medium       | in progress | public |      MS     | 
         | Raptor      | DuplicateItems Test UT Item |           | Question Bank | medium       | in progress | public |             | 
         | Raptor      | DuplicateItems Test MD Item |           | Question Bank | medium       | in progress | public |      MD     |