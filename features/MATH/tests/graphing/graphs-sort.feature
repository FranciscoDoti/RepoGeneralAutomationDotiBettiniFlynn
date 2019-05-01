Feature: Graph sorting by Id, Title, Type

Background: Logins to AMS and clicks on Graph Tab
    Given I login to AMS as "all-permissions-author"
    When I click on the Graphs Tab

    @Smoke, @Release2.8 @MATH-619, @Medium
    Scenario: Sorting by ID
        # TestRail Cases: C3126263,C3126281,C3126291, C3126292

        Then I verify the graphs list is "descending" order of graph "Id" column name
        When I click on the "Id" column name
        Then I verify the graphs list is "ascending" order of graph "Id" column name
        When I click on the "Id" column name
        Then I verify the graphs list is "descending" order of graph "Id" column name

    @Unit, @Release2.7, @MATH-316, @High
    Scenario: Sorting by Title
        # TestRail Cases: C3126288

        Then I verify the graphs list is "unsorted" order of graph "Title" column name 
        When I click on the "Title" column name
        Then I verify the graphs list is "ascending" order of graph "Title" column name
        When I click on the "Title" column name
        Then I verify the graphs list is "descending" order of graph "Title" column name

    @Regression, @Release2.6, @MATH-369, @Low
    Scenario: Sorting by Type
        # TestRail Cases: C3126289

        Then I verify the graphs list is "unsorted" order of graph "Type" column name  
        When I click on the "Type" column name
        Then I verify the graphs list is "ascending" order of graph "Type" column name
        When I click on the "Type" column name
        Then I verify the graphs list is "descending" order of graph "Type" column name