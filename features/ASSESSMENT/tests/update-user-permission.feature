@Assessment @Smoke
Feature: Verify Update User Permissions

    @UpdateUserPermissions
    Scenario: Verify that user's permission is getting updated through AMS
        Given I login to AMS as "all-permissions-author"
        When I search for the following user to update his permissions
            | User          |
            | Kelley.mccool |
        And I click on UserId and click all the permissions checkboxes and save
        And I go back to sapling page and logout
        And I login back to AMS again as "TestUser"
        And I verify the following tabs are displayed on the top
            | Tabs |
            | Items|
            | Users|
        And I go back to sapling page and logout
        And I login to AMS as "all-permissions-author"
        And I search for the following user to update his permissions
            | User          |
            | Kelley.mccool |
        And I click on UserId and click all the permissions checkboxes and save
        And I go back to sapling page and logout
        And I login back to AMS again as "TestUser"
        And I verify the following tabs are displayed on the top
            | Tabs          |
            | Items         |
            | Deleted Items |
            | Users         |
            | New User      |
            | Taxonomies    |
            | Book Groups   |
            | Resources     |
            | Graphs        |