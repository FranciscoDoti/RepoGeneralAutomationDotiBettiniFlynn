Feature: Grant roles to users as admin 
 
    Scenario Outline: Verify that existing Admin is able to grant roles for Admin, Media Producer, Media Editor, Customer Support & Paid access Code Creators

        Given I click login to the Achieve product
        And I have logged in as "admin_1"
        And I click on "course" system "admin_menu" feature "manage_roles" element and grant roles

        Then I verify Manage roles is displayed
            | page_def                 | disabled   |
            | manage_role_email_input  | grantrole  |
            | manage_role_select_list  | revokerole |
       
        When I revoke <roles> of <users>
        And I close the popup message 
        And I grant <roles> to the <users>

        Then I verify "course" system "create_course" feature "success_message" element's <role_update_message> message is displayed
        Examples: 
            |users                  | roles                        | role_update_message          |
            |"admin_2"              | "Admin"                      | "admin_message"              |
            |"customer_support_1"   | "Customer Support"           | "customer_support_message"   |
            |"media_producer_2"     | "Media Producer"             | "medai_producer_message"     | 
            |"paid_access"          | "Paid Access Code Creator"   | "paid_access_message"        |
            
