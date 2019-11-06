@Assessment @AMS @FilterItems
Feature: To verify the correct functionality of ams's item filter

    @TextFilter @Smoke
    Scenario: Apply text filter and verify whether the AMS items are changing based on text filter
        Given I login to AMS as "all-permissions-author"
        When I apply the following text filter "CEE"
        Then I verify that the items match with the text filter "CEE" that was applied

        
    @VerifyLoadMore @Smoke
    Scenario: Verify whether items on AMS screen increase on clicking Load More
        Given I login to AMS as "all-permissions-author"
        When I apply the following filters
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
        And I click on Load More
        Then I verify that the quantity of items on AMS screen have increased

    @MultipleFilters @VerifyChanges @Smoke
    Scenario: Change the filter. Apply multiple filters and verify  whether the AMS items are changing based on filter
        Given I login to AMS as "all-permissions-author"
        When I apply the following filters
            | Filter | Option                  |
            | Topic  | End of Chapter Problems |
        And I remove the following filters
            | Filter | Option                  |
            | Topic  | End of Chapter Problems |
        And I apply the following filters
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
            | Blooms | Remembering                    |
            | Access | public                         |
        Then I verify that items match with the following multiple filters that were applied
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
            | Blooms | Remembering                    |
            | Access | public                         |
            
        

    @ChangeFilterAndVerifyChanges @Smoke
    Scenario Outline: Change the filter and verify whether the AMS items are changing based on filter
        Given I login to AMS as "all-permissions-author"
        When I apply the following filters
            | Filter | Option                  |
            | Topic  | End of Chapter Problems |
        And I remove the following filters
            | Filter | Option                  |
            | Topic  | End of Chapter Problems |
        When I apply the filter options <Filter> and <Option>
        Then I verify that the items match with the filter applied with value <Option>
        
        Examples:
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |




    @VerifyItemsFiltered @Smoke
    Scenario Outline: Apply different filters and check that the items filtered match with the filter applied
        Given I login to AMS as "all-permissions-author"
        When I apply the filter options <Filter> and <Option>
        Then I verify that the items match with the filter applied with value <Option>
        
        Examples:
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
            | Topic  | End of Chapter Problems        |
            | Topic  | Price Floors                   |

    @Verify3FilterTagsAtSameTime @Smoke
    Scenario: Apply 3 different filters and verify that the tags are being displayed
        Given I login to AMS as "all-permissions-author"
        When I apply the following filters
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
            | Blooms | Remembering                    |
            | Access | public                         |
        Then I verify the following filter tags are displayed
            | Tag                                   |
            | Topic: Your Questions (uncategorized) |
            | Blooms: remembering                   |
            | Access: public                        |


    @VerifyFilterTags @Regression
    Scenario Outline: Select different filters and check that the tags are being displayed
        Given I login to AMS as "all-permissions-author"
        When I apply the filter options <Filter> and <Option>
        Then I verify that the filter tag is being displayed with label using <Filter> and <Option>

        Examples:
            | Filter               | Option                                                                     |
            | Topic                | Your Questions (uncategorized)                                             |
            | Topic                | End of Chapter Problems                                                    |
            | Topic                | Price Floors                                                               |
            | Topic                | Calculating GDP                                                            |
            | Topic                | Commas                                                                     |
            | Topic                | Calculating Real GDP                                                       |
            | Topic                | Subject-verb agreement                                                     |
            | Topic                | Following the Money: The Expanded Circular-Flow Diagram                    |
            | Topic                | Apostrophes                                                                |
            | Topic                | Run-ons and comma splices                                                  |
            | Blooms               | Remembering                                                                |
            | Blooms               | Understanding                                                              |
            | Blooms               | Applying                                                                   |
            | Blooms               | Analyzing                                                                  |
            | Blooms               | Evaluating                                                                 |
            | Blooms               | Creating                                                                   |
            | Difficulty           | easy                                                                       |
            | Difficulty           | medium                                                                     |
            | Difficulty           | hard                                                                       |
            | Taxonomy             | Question Bank                                                              |
            | Taxonomy             | Morris 3e - Biology How Life Works                                         |
            | Taxonomy             | Krugman/Wells 4e - Macroeconomics Test Bank                                |
            | Taxonomy             | Cowen/Tabarrok, Modern Principles: Microeconomics Test Bank                |
            | Taxonomy             | Chiang - Microeconomics, 4e Test Bank                                      |
            | Taxonomy             | Krugman/Wells Microeconomics in Modules 4e Test Bank                       |
            | Taxonomy             | Composition                                                                |
            | Taxonomy             | Sapling Economics                                                          |
            | Taxonomy             | Krugman/Wells Macroeconomics in Modules 4e Test Bank                       |
            | Taxonomy             | Chiang - Macroeconomics, 4e Test Bank                                      |
            | Status               | live                                                                       |
            | Status               | in progress                                                                |
            | Status               | child                                                                      |
            | Status               | deprecated                                                                 |
            | Status               | in review                                                                  |
            | Item Type            | performance                                                                |
            | Item Type            | participation                                                              |
            | Internal Topic Title | Your Questions (uncategorized)                                             |
            | Internal Topic Title | Questions For Review- duplicate ID 9016                                    |
            | Internal Topic Title | Desmos Dynamic Figures                                                     |
            | Internal Topic Title | Tax Revenues_cowentabarrokecon4e                                           |
            | Internal Topic Title | 34.5 Sensory Systems                                                       |
            | Internal Topic Title | Dimensional Analysis-GenChem                                               |
            | Internal Topic Title | Following the Money: The Expanded Circular-Flow Diagram_krugmanwellsecon5e |
            | Internal Topic Title | 14.3 Small-Scale Mutations                                                 |
            | Internal Topic Title | Intermolecular Forces- duplicate ID 463-GenChem                            |
            | Access               | public                                                                     |
            | Access               | private                                                                    |
            | Learning Objective   | untagged                                                                   |