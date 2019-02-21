 Feature: Signup Button Disabled Functionality Checks for Achieve IAM

    Scenario: Verify that the signup button is disabled if the Checkbox 'I have read and agree to the terms of use' is not checked 
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element                    | input                            |
        | email                      | coursewareachieve@gmail.com      |
        | password                   | ABCabc@123                       |
        | confirm_password           | ABCabc@123                       |
        | first_name                 | Addy                             |
        | last_name                  | min                              |
        | Security_Question_1        | What high school did you attend? |
        | Security_Question_1_Answer | answer                           |
        | Security_Question_2        | What is your favorite movie?     |
        | Security_Question_2_Answer | answer                           |
        | Security_Question_3        | What is your favorite color?     |
        | Security_Question_3_Answer | answer                           |
        | institution                | Miami University                 |

        Then I verify the "iam" system "create_account" feature "signup_btn" element is "not disabled"
    
    Scenario Outline: Verify that without entering all Mandatory Fields signup button is disabled
        Given I have opened "achieve" "user_creation"

        When I create a user with the data table credentials but missing <element>
        | element | input |
        | email | coursewareachieve@gmail.com |
        | password | ABCabc@123 |
        | confirm_password | ABCabc@123 |
        | first_name | Addy |
        | last_name | min |
        | Security_Question_1 | What high school did you attend? |
        | Security_Question_1_Answer | answer |
        | Security_Question_2 | What is your favorite movie? |
        | Security_Question_2_Answer | answer |
        | Security_Question_3 | What is your favorite color? |
        | Security_Question_3_Answer | answer |
        | institution | Miami University | 
        
        Then I verify the "iam" system "create_account" feature "signup_btn" element is "disabled"
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


    Scenario Outline: Verify that signup button is disabled when entering all Mandatory Fields (password is too short)
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
        
        Then I verify the "iam" system "create_account" feature "signup_btn" element is "disabled"    
        Examples:
        | password |
        | "ABab@12"|
        | ""       |
        | "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz12345678900987654321"  |
        | "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ12345678900987654321"  |


