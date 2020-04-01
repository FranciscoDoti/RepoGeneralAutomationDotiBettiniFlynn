@smoke @math @algos
Feature: Verify algos list buttons and fields

    Scenario: Verify Add / Delete list algos

        Given I login to AMS as "all-permissions-author"
        When I navigate to AuthorApp clicking on Raptor item on AMS page
        And I select Question tab and click on algos Variables button
       
        When I click on List Variable button, list algos table is added 
        When I click on Add Column and Delete Column buttons, list column is added and deleted respectively
        When I click on Add Row and Delete Row buttons, list row is added and deleted respectively
        When I click on Remove Table button, list algos table is deleted 