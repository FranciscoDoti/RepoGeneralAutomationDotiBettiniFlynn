Feature: Edit Account Options Checks Achieve via IAM
    
    Scenario: Verify that E-mail Address, first name, lastname, security question answers are all the same as when the user created the account
        Given I have opened "achieve" "login"
        
        When I click on "course" system "home" feature "sign_in" element
        And I have logged in as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element

        Then I check a user account for user from data_table
        | element                       | input                             |
        | email                         | coursewareachieve@gmail.com       |
        | first_name                    | Addy                              |
        | last_name                     | min                               |
        | Security_Question_1           | What high school did you attend?  |
        | Security_Question_1_Answer    | answer                            |
        | Security_Question_2           | What is your favorite movie?      |
        | Security_Question_2_Answer    | answer                            |
        | Security_Question_3           | What is your favorite color?      |
        | Security_Question_3_Answer    | answer                            |
        | institution                   | Miami University                  |

    Scenario: Verify that aplication return to home page on clicking Cancel Button
        Given I have opened "achieve" "login"
        
        When I click on "course" system "home" feature "sign_in" element
        And I have logged in as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element 
        And I click on "iam" system "create_account" feature "cancel_account" element

        Then I verify that the url "https://int-achieve-courseware-frontend.mldev.cloud/courses" is the current url in the "current" window

    Scenario: Verify that Set Password functionality is working as expected with a new password
        Given I have opened "achieve" "login"
        
        When I click on "course" system "home" feature "sign_in" element
        And I have logged in as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element
        And I click on "iam" system "create_account" feature "set_password_button" element
        And I input "ABCabc@123456" into "iam" system "create_account" feature "password" element
        And I click on "iam" system "create_account" feature "save_button" element
    
    Scenario: Verify that Set Password functionality is working as expected
        Given I have opened "achieve" "login"
        And I click on "course" system "home" feature "sign_in" element
        
        Then I have logged in with a new password "ABCabc@123456" as "admin_1"

    Scenario: Verify that Set Password functionality is working as expected reseting to original password
        Given I have opened "achieve" "login"
        
        When I click on "course" system "home" feature "sign_in" element
        And I have logged in with a new password "ABCabc@123456" as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element
        And I click on "iam" system "create_account" feature "set_password_button" element
        And I input "ABCabc@123" into "iam" system "create_account" feature "password" element
        And I click on "iam" system "create_account" feature "save_button" element
        
    Scenario: Verify that Set Password functionality is working as expected
        Given I have opened "achieve" "login"
        And I click on "course" system "home" feature "sign_in" element
        
        Then I have logged in as "admin_1"