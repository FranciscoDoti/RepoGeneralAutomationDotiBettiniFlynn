@Assessment @AMS @FilterItems
Feature: To verify the correct functionality of ams's item filter

    Background: Clear the filter buffer
        Given Clear filter buffer

    @VerifyItemsFiltered @Smoke @Outline
    Scenario Outline: Apply different filters and check that the items filtered match with the filter applied
        Given I login to AMS as "all-permissions-author"
        When I apply the filter options <Filter> and <Option>
        Then I verify that the items match with the filter applied with filter <Filter> and <Option>
        
        Examples:
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
            | Topic  | End of Chapter Problems        |

    @ChangeFilterAndVerifyChanges @Smoke @Outline
    Scenario Outline: Change the filter and verify whether the AMS items are changing based on filter
        Given I login to AMS as "all-permissions-author"
        When I apply the following filters
            | Filter | Option                  |
            | Topic  | End of Chapter Problems |
        And I remove the following filters
            | Filter | Option                  |
            | Topic  | End of Chapter Problems |
        When I apply the filter options <Filter> and <Option>
        Then I verify that the items match with the filter applied with filter <Filter> and <Option>
        
        Examples:
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |

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
            | Access | public                         |
        Then I verify that the items match with the filters applied

    @TextFilter @Smoke
    Scenario: Apply text filter and verify whether the AMS items are changing based on text filter
        Given I login to AMS as "all-permissions-author"
        When I apply the following text filter "CEE"
        Then I verify that the items match with the filters applied


    @VerifyLoadMore @Smoke
    Scenario: Verify whether items on AMS screen increase on clicking Load More
        Given I login to AMS as "all-permissions-author"
        When I apply the following filters
            | Filter | Option                         |
            | Topic  | Your Questions (uncategorized) |
        And I click on Load More
        Then I verify that the quantity of items on AMS screen have increased


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
            # | Topic                | Your Questions (uncategorized)                                             |
            | Topic                | End of Chapter Problems                                                    |
            # | Blooms               | Remembering                                                                |
            # | Blooms               | Understanding                                                              |
            # | Blooms               | Applying                                                                   |
            | Blooms               | Analyzing                                                                  |
            # | Blooms               | Evaluating                                                                 |
            # | Blooms               | Creating                                                                   |
            # | Difficulty           | easy                                                                       |
            # | Difficulty           | medium                                                                     |
            | Difficulty           | hard                                                                       |
            | Taxonomy             | Question Bank                                                              |
            # | Taxonomy             | Morris 3e - Biology How Life Works                                         |
            # | Taxonomy             | Krugman/Wells 4e - Macroeconomics Test Bank                                |
            # | Taxonomy             | Cowen/Tabarrok, Modern Principles: Microeconomics Test Bank                |
            # | Taxonomy             | Chiang - Microeconomics, 4e Test Bank                                      |
            # | Taxonomy             | Krugman/Wells Microeconomics in Modules 4e Test Bank                       |
            # | Taxonomy             | Composition                                                                |
            # | Taxonomy             | Sapling Economics                                                          |
            # | Taxonomy             | Krugman/Wells Macroeconomics in Modules 4e Test Bank                       |
            # | Taxonomy             | Chiang - Macroeconomics, 4e Test Bank                                      |
            # | Status               | live                                                                       |
            # | Status               | in progress                                                                |
            # | Status               | child                                                                      |
            | Status               | deprecated                                                                 |
            # | Status               | in review                                                                  |
            # | Item Type            | performance                                                                |
            | Item Type            | participation                                                              |
            | Internal Topic Title | Your Questions (uncategorized)                                             |
            | Access               | public                                                                     |
            # | Access               | private                                                                    |
            | Learning Objective   | untagged                                                                   |