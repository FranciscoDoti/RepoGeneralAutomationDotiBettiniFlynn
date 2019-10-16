@Assessment @Smoke
Feature: Verify Update User Permissions

    @UpdateUserPermissions
    Scenario: Verify that user's permission is getting updated through AMS
        Given I login to AMS as "all-permissions-author"
        When I search for the user "Kelley Mccool" to update his permissions
        And I click on UserId and un-check the following permissions checkboxes and save
            | Permission                     |
            | Manage Live Questions          |
            | Manage Users                   |
            | Edit Any Question              |
            | Manage Graphs                  | 
            | Delete question                |
            | Create New Questions           |
            | Manage Taxonomies and Bookgroups|
        And I go back to sapling page and logout
        And I login to AMS as "test-user"
        Then I verify the following tabs are displayed on the top
            | TabName  |
            | Items    |
            | Users    |
        And I go back to sapling page and logout
        When I login to AMS as "all-permissions-author"
        And I search for the user "Kelley Mccool" to update his permissions
        And I click on UserId and check the following permissions checkboxes and save
            | Permission                     |
            | Manage Live Questions          |
            | Manage Users                   |
            | Edit Any Question              |
            | Manage Graphs                  | 
            | Delete question                |
            | Create New Questions           |
            | Manage Taxonomies and Bookgroups| 
        And I go back to sapling page and logout
        And I login to AMS as "test-user"
        Then I verify the following tabs are displayed on the top
            | TabName       |
            | Items         |
            | Deleted Items |
            | Users         |
            | New User      |
            | Taxonomies    |
            | Book Groups   |
            | Resources     |
            | Graphs        |