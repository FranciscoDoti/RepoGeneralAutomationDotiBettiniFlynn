Feature: Authentication for Achieve via IAM 
    
    @quit-driver
    Scenario: Verify that First Name field and last name validations are working as expected when entering number and special characters
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element   | input |
        | first_name| 444   |
        | last_name | 444   |

        Then I verify for "iam" system "create_account" feature "first_name_error" element that "create_account" feature "first_name_error" message is displayed
        Then I verify for "iam" system "create_account" feature "last_name_error" element that "create_account" feature "last_name_error" message is displayed

    @quit-driver
    Scenario: Verify that First Name field and last name validations are working as expected when entering blank
        Given I have opened "achieve" "user_creation"

        When I input "" into "iam" system "create_account" feature "first_name" element
        And I input "" into "iam" system "create_account" feature "last_name" element
        And I click on "iam" system "create_account" feature "institution" element

        Then I verify for "iam" system "create_account" feature "first_name_error" element that "create_account" feature "first_name_error" message is displayed
        And I verify for "iam" system "create_account" feature "last_name_error" element that "create_account" feature "last_name_error" message is displayed

    @quit-driver
    Scenario: Verify that First Name field and last name validations are working as expected (with  entering large character)
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element   | input                                      |
        | first_name| abcdefghijklmnopqrstuvwxyzabcdefghijklam   |
        | last_name | abcdefghijklmnopqrstuvwxyzabcdefghijklam   |

        Then I verify for "iam" system "create_account" feature "largechar_firstname" element that "create_account" feature "over_char_limit" message is displayed
        And I verify for "iam" system "create_account" feature "largechar_lastname" element that "create_account" feature "over_char_limit" message is displayed

    @quit-driver
    Scenario: Verify that password field validations are working as expected for eight characters
        Given I have opened "achieve" "user_creation"

        When I create a user with the data table credentials
        | element          | input     |
        | password         | Passw1!   |
        | confirm_password | Passw1!   |

        Then I verify for "iam" system "create_account" feature "password_error" element that "create_account" feature "pw_under_char_limit" message is displayed


    @quit-driver
    Scenario: Verify that confirm password field validations are working as expected
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element          | input     |
        | password         | Passwoo1! |
        | confirm_password | Passwooo1!|
        
        Then I verify for "iam" system "create_account" feature "confirm_password_error" element that "create_account" feature "confirm_password_error" message is displayed        
    
    @quit-driver
    Scenario: Verify that Security Questions & Answer validations are working as expected with extra characters
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | input                            | element             |
        | What high school did you attend? | Security_Question_1 |
        | What high school did you attend? | Security_Question_2 | 
        | What high school did you attend? | Security_Question_3 |
        | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ | Security_Question_1_Answer |
        | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ | Security_Question_2_Answer |
        | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ | Security_Question_3_Answer |

        Then I verify for "iam" system "create_account" feature "Security_question_1_error" element that "create_account" feature "Security_question_error" message is displayed
        And I verify for "iam" system "create_account" feature "Security_question_2_error" element that "create_account" feature "Security_question_error" message is displayed
        And I verify for "iam" system "create_account" feature "Security_question_3_error" element that "create_account" feature "Security_question_error" message is displayed

    @quit-driver
    Scenario Outline: Verify that Security Questions & Answer validations are working as expected with no answer
        Given I have opened "achieve" "user_creation"
        
        When I input "What high school did you attend?" into "iam" system "create_account" feature <security_question> element
        And I input "" into "iam" system "create_account" feature <security_answer> element
        And I input "" into "iam" system "create_account" feature "institution" element
        
        Then I verify for "iam" system "create_account" feature <security_error> element that "create_account" feature "Security_question_error_blank" message is displayed
        Examples:
        | security_question     | security_answer              | security_error                    |
        | "Security_Question_1" | "Security_Question_1_Answer" | "Security_question_1_error_blank" |
        | "Security_Question_2" | "Security_Question_2_Answer" | "Security_question_2_error_blank" |
        | "Security_Question_3" | "Security_Question_3_Answer" | "Security_question_3_error_blank" |

    @quit-driver
    Scenario: Verify that the application should not allow to enter more than 150 characters in the Primary institution text box. Moreover on entering 150 characters, the application displays a message "Limit of 150 characters reached"
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element     | input |
        | institution | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ |

        Then I verify for "iam" system "create_account" feature "institution_error_message" element that "create_account" feature "institution_error_message" message is displayed

    @quit-driver
    Scenario: Verify that on selecting a US college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element     | input          |
        | institution | Cottey College |

        Then I verify the "iam" system "create_account" feature "opt_in" element checkbox checked is "true"

    @quit-driver
    Scenario: Verify that on selecting a Canada College in "Primary Institution or School" text box, the application should not automatically check the "OPT IN" check box
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element       | input                 |
        | institution   | University of Toronto |

        Then I verify the "iam" system "create_account" feature "opt_in" element checkbox checked is "false"     
    
    @quit-driver
    Scenario: Verify that Privacy Notice Link exists and redirects to appropriate page
        Given I have opened "achieve" "user_creation"
        
        Then I verify that "iam" system "create_account" feature "privacy_notice" element link exists

        When I click on "iam" system "create_account" feature "privacy_notice" element

        Then I verify that the url "https://store.macmillanlearning.com/us/privacy-notice" is the current url in the new window
    
    @quit-driver
    Scenario: Verify that the signup button is disabled if the Checkbox 'I have read and agree to the terms of use' is not checked 
        Given I have opened "achieve" "user_creation"
        
        Then I have created a user "admin_6"
        And I click on "iam" system "create_account" feature "terms_of_service" element        

        Then I verify the "iam" system "create_account" feature "signup_btn" element disabled attribute is "true"

    Scenario: Verify that Terms of use link redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "terms_of_use" element

        Then I verify that the url "https://store.macmillanlearning.com/us/termsOfUse" is the current url

    
    @quit-driver
    Scenario Outline: Verify that without entering all Mandatory Fields signup button is disabled
        Given I have opened "achieve" "user_creation"

        When I have created a user "admin_6" without <element> field        
        
        Then I verify the "iam" system "create_account" feature "signup_btn" element disabled attribute is "true"
        Examples:
        | element                       |
        | "email"                       |
        | "password"                    |
        | "confirm_password"            |
        | "first_name"                  |
        | "last_name"                   |
        | "Security_Question_1"         |
        | "Security_Question_1_Answer"  |
        | "Security_Question_2"         |
        | "Security_Question_2_Answer"  |
        | "Security_Question_3"         |
        | "Security_Question_3_Answer"  |
        | "institution"                 |


    @quit-driver
    Scenario Outline: Verify that without entering all Mandatory Fields (password is too short)
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
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
        And I input <password> into "iam" system "create_account" feature "password" element
        And I input <password> into "iam" system "create_account" feature "confirm_password" element 
        
        Then I verify the "iam" system "create_account" feature "signup_btn" element disabled attribute is "true"    
        Examples:
        | password |
        | "ABab@12"|
        | ""       |
        | "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz12345678900987654321"  |
        | "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ12345678900987654321"  |

    @quit-driver
    Scenario Outline: Verify that entering a password that is too long 
        Given I have opened "achieve" "user_creation"

        When I input <password> into "iam" system "create_account" feature "password" element
        And I input <password> into "iam" system "create_account" feature "confirm_password" element 

        Then I verify the password inputed <password> is not the same as the one that was allowed <password_allowed>
        Examples:
        | password | password_allowed |
        | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@$" | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321" |
    
    @quit-driver
    Scenario: Verify the Terms of Purchase link directs to the page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "terms_of_purchase" element
        
        Then I verify that the url "https://store.macmillanlearning.com/us/terms-of-purchase-rental" is the current url in the new window

    @quit-driver
    Scenario: Verify that Piracy Link redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "piracy_link" element
        
        Then I verify that the url "https://www.macmillanlearning.com/Catalog/page/piracy" is the current url in the new window

    @quit-driver
    Scenario: Verify that Privacy Link redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "privacy_link" element
        
        Then I verify that the url "https://store.macmillanlearning.com/us/privacy-notice" is the current url in the new window

    @quit-driver
    Scenario: Verify that macmillan learning redirects to appropriate page
        Given I have opened "achieve" "user_creation"

        When I click on "iam" system "create_account" feature "macmillan_link" element
        
        Then I verify that the url "https://www.macmillanlearning.com/catalog" is the current url

    @quit-driver
    Scenario: Verify that E-mail Address, first name, lastname, security question answers are all the same as when the user created the account
        Given I have opened "achieve" "login"
        
        When I click on "iam" system "home" feature "sign_in" element
        And I have logged in as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element

        Then I check a user account for user "admin_6"

    @quit-driver
    Scenario: Verify that aplication return to home page on clicking Cancel Button
        Given I have opened "achieve" "login"
        
        When I click on "iam" system "home" feature "sign_in" element
        And I have logged in as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element 
        And I click on "iam" system "create_account" feature "cancel_account" element

        Then I verify that the url "https://int-achieve-courseware-frontend.mldev.cloud/courses" is the current url

    @quit-driver
    Scenario: Verify that Set Password functionality is working as expected with a new password
        Given I have opened "achieve" "login"
        
        When I click on "iam" system "home" feature "sign_in" element
        And I have logged in as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element
        And I click on "iam" system "create_account" feature "set_password_button" element
        And I input "ABCabc@123456" into "iam" system "create_account" feature "password" element
        And I click on "iam" system "create_account" feature "save_button" element

    @quit-driver    
    Scenario: Verify that Set Password functionality is working as expected
        Given I have opened "achieve" "login"
        And I click on "iam" system "home" feature "sign_in" element
        
        Then I have logged in with a new password "ABCabc@123456" as "admin_1"

    @quit-driver
    Scenario: Verify that Set Password functionality is working as expected reseting to original password
        Given I have opened "achieve" "login"
        
        When I click on "iam" system "home" feature "sign_in" element
        And I have logged in with a new password "ABCabc@123456" as "admin_1"
        And I click on "iam" system "create_account" feature "user_menu" element
        And I click on "iam" system "create_account" feature "account" element
        And I click on "iam" system "create_account" feature "set_password_button" element
        And I input "ABCabc@123" into "iam" system "create_account" feature "password" element
        And I click on "iam" system "create_account" feature "save_button" element
    
    @quit-driver    
    Scenario: Verify that Set Password functionality is working as expected
        Given I have opened "achieve" "login"
        And I click on "iam" system "home" feature "sign_in" element
        
        Then I have logged in as "admin_1"
