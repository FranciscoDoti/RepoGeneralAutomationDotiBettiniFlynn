@Assessment @AMS @Filter @Items
Feature: To verify the correct functionality of ams's item filter

    @VerifyFilterTags
    Scenario Outline: Select different filters and check that the tags are being displayed
        Given I login to AMS as "all-permissions-author"
        When I select the filter options <mainOption> and <subOption>
        Then I verify that the tag is being displayed with label using <mainOption> and <subOption>
        Examples:
            | mainOption           | subOption                                                                   |
            | Topic                | Your Questions (uncategorized)                                              |
            | Topic                | End of Chapter Problems                                                     |
            | Topic                | Price Floors                                                                |
            | Topic                | Calculating GDP                                                             |
            | Topic                | Commas                                                                      |
            | Topic                | Calculating Real GDP                                                        |
            | Topic                | Subject-verb agreement                                                      |
            | Topic                | Following the Money: The Expanded Circular-Flow Diagram                     |
            | Topic                | Apostrophes                                                                 |
            | Topic                | Run-ons and comma splices                                                   |
            | Blooms               | Remembering                                                                 |
            | Blooms               | Understanding                                                               |
            | Blooms               | Applying                                                                    |
            | Blooms               | Analyzing                                                                   |
            | Blooms               | Evaluating                                                                  |
            | Blooms               | Creating                                                                    |            
            | Difficulty           | easy                                                                        |
            | Difficulty           | medium                                                                      |
            | Difficulty           | hard                                                                        |
            | Taxonomy             | Question Bank                                                               |
            | Taxonomy             | Morris 3e - Biology How Life Works                                          |
            | Taxonomy             | Krugman/Wells 4e - Macroeconomics Test Bank                                 |
            | Taxonomy             | Cowen/Tabarrok, Modern Principles: Microeconomics Test Bank                 |
            | Taxonomy             | Chiang - Microeconomics, 4e Test Bank                                       |
            | Taxonomy             | Krugman/Wells Microeconomics in Modules 4e Test Bank                        |
            | Taxonomy             | Composition                                                                 |
            | Taxonomy             | Sapling Economics                                                           |
            | Taxonomy             | Krugman/Wells Macroeconomics in Modules 4e Test Bank                        |
            | Taxonomy             | Chiang - Macroeconomics, 4e Test Bank                                       |
            | Status               | live                                                                        |
            | Status               | in progress                                                                 |     
            | Status               | child                                                                       |
            | Status               | deprecated                                                                  |   
            | Status               | in review                                                                   |
            | Item Type            | performance                                                                 |
            | Item Type            | participation                                                               |                      
            | Internal Topic Title | Your Questions (uncategorized)                                              |            
            | Internal Topic Title | Questions For Review- duplicate ID 9016                                     |
            | Internal Topic Title | Desmos Dynamic Figures                                                      |
            | Internal Topic Title | Tax Revenues_cowentabarrokecon4e                                            |
            | Internal Topic Title | 34.5 Sensory Systems                                                        |  
            | Internal Topic Title | Dimensional Analysis-GenChem                                                |            
            | Internal Topic Title | Following the Money: The Expanded Circular-Flow Diagram_krugmanwellsecon5e  |
            | Internal Topic Title | 14.3 Small-Scale Mutations                                                  |
            | Internal Topic Title | Intermolecular Forces- duplicate ID 463-GenChem                             |
            | Access               | public                                                                      |   
            | Access               | private                                                                     |     
            | Learning Objective   | untagged                                                                    |   


    @Verify3FilterTagsAtSameTime
    Scenario: Select 3 different filters and verify that the tags are being displayed
        Given I login to AMS as "all-permissions-author"
        When I select various filters from datatable
             | mainOption           | subOption                                                                   |
             | Topic                | Your Questions (uncategorized)                                              |
             | Bloom's              | 1 - Remembering                                                             |
             | Access               | public                                                                      |
        Then I verify that the following tabs are being displayed
             | mainOption           | subOption                                                                   |
             | Topic                | Your Questions (uncategorized)                                              |
             | Bloom's              | 1 - Remembering                                                             |
             | Access               | public                                                                      |


    @VerifyItemsFiltered
    Scenario Outline: Select different filters and check that the items filtered match with the filter applied
        Given I login to AMS as "all-permissions-author"
        When I select the filter options <mainOption> and <subOption>
        Then I verify that the items match with the filter applied in the column <mainOption> and value <subOption>