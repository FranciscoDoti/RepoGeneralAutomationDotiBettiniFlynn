@Course @Smoke
Feature: Admin Grantroles to the user 

    Scenario Outline: Verify that existing Admin is able to grant roles for Admin, Media Producer, Media Editor, Customer Support & Paid access Code Creators

        Given I login to Achieve-CW as "admin_1"
        When I click on Manage roles

        Then I verify Manage roles is displayed
            | field                    | disabled   |
            | manageRolesEmailInput    | grantRole  |
            | chooseRole               | revokeRole |
       
        When I revoke <roles> of <users> 
        And I grant <roles> to the <users>

        Then I verfy the message displayed for each <users> according to their <role> 
        Examples: 
            |users                  | roles                        | role                                                         |
            |"admin_2"              | "Admin"                      | "Admin privileges have been granted for"                     |
            |"customer_support_1"   | "Customer Support"           | "Customer Support privileges have been granted for"          |
            |"media_producer_2"     | "Media Producer"             | "Media Producer privileges have been granted for"            | 
            |"paid_access"          | "Paid Access Code Creator"   | "Paid Access Code Creator privileges have been granted for"  |
            |"media_editor_1"       | "Media Editor"               | "Media Editor privileges have been granted for"              |
    
            

    
    