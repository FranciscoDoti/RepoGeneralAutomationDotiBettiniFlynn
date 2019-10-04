@Assessment @Smoke
Feature: As a user, I want to duplicate an existing item

   Scenario:  User creates a new AMS raptor item with Ungraded text and duplicate it
      Given I login to AMS as "all-permissions-author"
      When I add the "Ungraded Text" module
      And  I add the Ungraded text module with following details
         | Title                | Text                      |
         | NGA QA Ungraded text | This is an automated test |
      And I verify the details of the following items are displayed in AMS
         | Author Mode | Title                | Topic     | Taxonomy      | Difficulty   | Status      | Access | Module Type |
         | Raptor      | NGA QA Ungraded text |           | Question Bank | medium       | in progress | public |             | 
      And I duplicate the item with title "NGA QA Ungraded text"
      Then I verify the details of the following items are displayed in AMS
         | Author Mode | Title                | Topic     | Taxonomy      | Difficulty   | Status      | Access | Module Type |
         | Raptor      | NGA QA Ungraded text |           | Question Bank | medium       | in progress | public |             | 