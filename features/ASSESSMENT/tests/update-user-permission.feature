@Assessment @Smoke
Feature: Verify Update User Permissions

    @UpdateUserPermissions
    Scenario: Verify that user's permission is getting updated through AMS
        Given I login to AMS as "all-permissions-author"
        When I search for the following user to update his permissions
            | User          |
            | Kelley.mccool |
        And I click on UserId and un-check the following permissions checkboxes and save
        | Permissions Checkboxes         |
        | Manage Live Questions          |
        | Manage Users                   |
        | Edit Any Question              |
        | Manage Graphs                  | 
        | Delete question                |
        | Create New Questions           |
        | Manage Taxonomies and Bookgroups|

        And I go back to sapling page and logout
        And I login back to AMS again as "TestUser"
        And I verify the following tabs are displayed on the top
            | Tab Name |
            | Items    |
            | Users    |
        And I go back to sapling page and logout
        And I login to AMS as "all-permissions-author"
        And I search for the following user to update his permissions
            | User          |
            | Kelley.mccool |
        And I click on UserId and check the following permissions checkboxes and save
        | Permissions Checkboxes         |
        | Manage Live Questions          |
        | Manage Users                   |
        | Edit Any Question              |
        | Manage Graphs                  | 
        | Delete question                |
        | Create New Questions           |
        | Manage Taxonomies and Bookgroups| 
        And I go back to sapling page and logout
        And I login back to AMS again as "TestUser"
        And I verify the following tabs are displayed on the top
            | Tab Name      |
            | Items         |
            | Deleted Items |
            | Users         |
            | New User      |
            | Taxonomies    |
            | Book Groups   |
            | Resources     |
            | Graphs        |