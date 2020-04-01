@smoke @math @algos
Feature: Verify algos list values

    Scenario: Verify input values of list algos without question tags on answer labels and author answer

        Given I login to AMS as "all-permissions-author"
        When I navigate to AuthorApp clicking on Raptor item on AMS page
        And I select Question tab and click on algos Variables button
       
        When I click on List Variable button, list algos table is added 
        And I add a list column and input values "4", "7" and "5"
        And I add MEE module and input the list algos variable
        When I click cycle variables, I verify the list input values and verify there are no question tags