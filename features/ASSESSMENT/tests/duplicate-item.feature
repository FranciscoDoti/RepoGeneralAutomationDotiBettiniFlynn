@Assessment @Smoke
Feature: As a user, I want to duplicate an existing item

   Scenario:  User creates new AMS raptor items and duplicate its
      Given I login to AMS as "all-permissions-author"
      When I create the following draft Raptor items in AMS
         | Title               | Module Type       |
         | NGA QA Test MC Item | Multiple Choice   |
         | NGA QA Test MS Item | Multiple Select   |
         | NGA QA Test UT Item | Ungraded Text     |
         | NGA QA Test MD Item | Molecular Drawing |
      And I verify the details of the following items are displayed in AMS
         | Author Mode | Title               | Topic     | Taxonomy      | Difficulty   | Status      | Access | Module Type |
         | Raptor      | NGA QA Test MC Item |           | Question Bank | medium       | in progress | public |      MC     | 
         | Raptor      | NGA QA Test MS Item |           | Question Bank | medium       | in progress | public |      MS     | 
         | Raptor      | NGA QA Test UT Item |           | Question Bank | medium       | in progress | public |             | 
         | Raptor      | NGA QA Test MD Item |           | Question Bank | medium       | in progress | public |      MD     | 
      And I duplicate the following items
         | Title               |
         | NGA QA Test MC Item |
         | NGA QA Test MS Item |
         | NGA QA Test UT Item |
         | NGA QA Test MD Item |
      Then I verify the details of the following items are displayed in AMS
         | Author Mode | Title               | Topic     | Taxonomy      | Difficulty   | Status      | Access | Module Type |
         | Raptor      | NGA QA Test MC Item |           | Question Bank | medium       | in progress | public |      MC     | 
         | Raptor      | NGA QA Test MS Item |           | Question Bank | medium       | in progress | public |      MS     | 
         | Raptor      | NGA QA Test UT Item |           | Question Bank | medium       | in progress | public |             | 
         | Raptor      | NGA QA Test MD Item |           | Question Bank | medium       | in progress | public |      MD     |