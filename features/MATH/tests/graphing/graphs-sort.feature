@math @graph @graph-sort
Feature: Graph sorting by Id, Title, Type

Background: Logins to AMS and clicks on Graph Tab
    Given I login to AMS as "all-permissions-author"
    When I click on the Graphs tab

    Scenario: Sorting by ID
        # TestRail Cases: C3126263,C3126281,C3126291, C3126292

        Then I verify the graphs list is "descending" order of graph "Id" column name
        When I click on the "Id" column name
        Then I verify the graphs list is "ascending" order of graph "Id" column name
        When I click on the "Id" column name
        Then I verify the graphs list is "descending" order of graph "Id" column name

    Scenario: Sorting by Title
        # TestRail Cases: C3126288

        Then I verify the graphs list is "unsorted" order of graph "Title" column name 
        When I click on the "Title" column name
        Then I verify the graphs list is "ascending" order of graph "Title" column name
        When I click on the "Title" column name
        Then I verify the graphs list is "descending" order of graph "Title" column name

    # ----- TO DO for future work when Graded type graph requirement is in ----
    #    -- Scenario: Sorting by Type --- 
    #     # TestRail Cases: C3126289

    #     Then I verify the graphs list is "unsorted" order of graph "Type" column name  
    #     When I click on the "Type" column name
    #     Then I verify the graphs list is "ascending" order of graph "Type" column name
    #     When I click on the "Type" column name
    #     Then I verify the graphs list is "descending" order of graph "Type" column name