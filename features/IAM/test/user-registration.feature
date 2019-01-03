Feature: Field Validation Scenarios for Achieve via IAM Create Account Page

    Scenario: Verify that First Name field and last name validations are working as expected when entering number and special characters
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element   | input |
        | first_name| 444   |
        | last_name | 444   |

        Then I verify for "iam" system "create_account" feature "first_name_error" element that "create_account" feature "first_name_error" message is displayed
        Then I verify for "iam" system "create_account" feature "last_name_error" element that "create_account" feature "last_name_error" message is displayed

    Scenario: Verify that First Name field and last name validations are working as expected when entering blank
        Given I have opened "achieve" "user_creation"

        When I input "" into "iam" system "create_account" feature "first_name" element
        And I input "" into "iam" system "create_account" feature "last_name" element
        And I click on "iam" system "create_account" feature "institution" element

        Then I verify for "iam" system "create_account" feature "first_name_error" element that "create_account" feature "first_name_error" message is displayed
        And I verify for "iam" system "create_account" feature "last_name_error" element that "create_account" feature "last_name_error" message is displayed

    Scenario: Verify that First Name field and last name validations are working as expected (with  entering large character)
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element   | input                                      |
        | first_name| abcdefghijklmnopqrstuvwxyzabcdefghijklam   |
        | last_name | abcdefghijklmnopqrstuvwxyzabcdefghijklam   |

        Then I verify for "iam" system "create_account" feature "largechar_firstname" element that "create_account" feature "over_char_limit" message is displayed
        And I verify for "iam" system "create_account" feature "largechar_lastname" element that "create_account" feature "over_char_limit" message is displayed

    Scenario: Verify that password field validations are working as expected for eight characters
        Given I have opened "achieve" "user_creation"

        When I create a user with the data table credentials
        | element          | input     |
        | password         | Passw1!   |
        | confirm_password | Passw1!   |

        Then I verify for "iam" system "create_account" feature "password_error" element that "create_account" feature "pw_under_char_limit" message is displayed


    Scenario: Verify that confirm password field validations are working as expected
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element          | input     |
        | password         | Passwoo1! |
        | confirm_password | Passwooo1!|
        
        Then I verify for "iam" system "create_account" feature "confirm_password_error" element that "create_account" feature "confirm_password_error" message is displayed        

    Scenario Outline: Verify that entering a password that is too long 
        Given I have opened "achieve" "user_creation"

        When I input <password> into "iam" system "create_account" feature "password" element
        And I input <password> into "iam" system "create_account" feature "confirm_password" element 

        Then I verify the password inputed <password> is not the same as the one that was allowed <password_allowed>
        Examples:
        | password | password_allowed |
        | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@$" | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321" |
    

    Scenario: Verify that Security Questions & Answer validations are working as expected with extra characters
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element                    | input                            |
        | Security_Question_1        | What high school did you attend? |
        | Security_Question_2        | What high school did you attend? |
        | Security_Question_3        | What high school did you attend? |
        | Security_Question_1_Answer | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ |
        | Security_Question_2_Answer | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ |
        | Security_Question_3_Answer | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ |

        Then I verify for "iam" system "create_account" feature "Security_question_1_error" element that "create_account" feature "Security_question_error" message is displayed
        And I verify for "iam" system "create_account" feature "Security_question_2_error" element that "create_account" feature "Security_question_error" message is displayed
        And I verify for "iam" system "create_account" feature "Security_question_3_error" element that "create_account" feature "Security_question_error" message is displayed

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

    Scenario: Verify that the application should not allow to enter more than 150 characters in the Primary institution text box. Moreover on entering 150 characters, the application displays a message "Limit of 150 characters reached"
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element     | input |
        | institution | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ |

        Then I verify for "iam" system "create_account" feature "institution_error_message" element that "create_account" feature "institution_error_message" message is displayed

    Scenario: Verify that on selecting a US college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element     | input          |
        | institution | Cottey College |

        Then I verify the "iam" system "create_account" feature "opt_in" element checkbox is "checked"

    Scenario: Verify that on selecting a Canada College in "Primary Institution or School" text box, the application should not automatically check the "OPT IN" check box
        Given I have opened "achieve" "user_creation"
        
        When I create a user with the data table credentials
        | element       | input                 |
        | institution   | University of Toronto |

        Then I verify the "iam" system "create_account" feature "opt_in" element checkbox is "not checked"     