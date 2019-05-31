Feature: Admin Grantroles to the user 

    Scenario Outline: Verify that existing Admin is able to grant roles for Admin, Media Producer, Media Editor, Customer Support & Paid access Code Creators

        Given I login to Achieve-CW as "admin_1"
        When I click on Manage roles

        Then I verify Manage roles is displayed
            | field                    | disabled   |
            | manage_role_email_input  | grantrole  |
            | manage_role_select_list  | revokerole |
       
        When I revoke <roles> of <users> 
        And I grant <roles> to the <users>

        Then I verify the message for each <role> 
        Examples: 
            |users                  | roles                        | role                                                                                          |
            |"admin_2"              | "Admin"                      | "Admin privileges have been granted for james@pay-mon.com."                                   |
            |"customer_support_2"   | "Customer Support"           | "Customer Support privileges have been granted for nowunojuwe@airsport.top."                  |
            |"media_producer_2"     | "Media Producer"             | "Media Producer privileges have been granted for cibico@mailhub.top."                         | 
            |"paid_access_1"        | "Paid Access Code Creator"   | "Paid Access Code Creator privileges have been granted for paidaccess@safe-planet.com."       |
            |"media_editor_1"       | "Media Editor"               | "Media Editor privileges have been granted for mediaeditor13@gmail.com."                      |
    
            

    
    