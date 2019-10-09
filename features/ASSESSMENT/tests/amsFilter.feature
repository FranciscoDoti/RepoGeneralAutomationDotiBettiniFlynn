@Assessment @AMS @Filter @Items
Feature: To verify the correct functionality of ams's item filter

    @VerifyFilterTags
    ScenarioOutline: Select different filters and I check that the tags are being displayed
        Given I login to AMS as "all-permissions-author"
        When I select the filter options <MainOption> and <subOption>
        Then I verify that the tag is being displayed

        Examples:
        | MainOption               | subOption| 
        | Topic                    | Your Questions (Uncategorized) - 19795         |
        | Topic                    | End Of Chapter Problems - 2406                 |
        