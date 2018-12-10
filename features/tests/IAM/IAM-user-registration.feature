Feature: Authentication for Achieve via IAM

    Scenario Outline: Verify that First Name field and last name validations are working as expected (without entering)
        Given I have opened Achieve "UserCreationUrl"
        When I verify the functionality of first name by entering <firstname> 
        When I verify the functionality of last name by entering <lastname>
        Then I verify validation message for first name
        And I verify validation message for last name
        Examples:
        |firstname | lastname |
        | ""       | ""       |
        | "33"     | "444"    |
        | "e!!!"    |  "#rr"  |

    Scenario: Verify that First Name field and last name validations are working as expected (with  entering large character)
        Given I have opened Achieve "UserCreationUrl"
        When I verify the functionality of first name and lastname by entering large characters
        Then I verify large char validation message in the first name field
        Then I verify large char validation message in the last name field

    Scenario: Verify that password field validations are working as expected
        Given I have opened Achieve "UserCreationUrl"
        When I hover on icon "i"
        And I enter password having eight characters not fullfilling the criteria
        And I check the error message
        And I hover on icon "i"
        And I enter password from "student" account having eight character fullfilling the criteria

    Scenario: Verify that confirm password field validations are working as expected
        Given I have opened Achieve "UserCreationUrl"
        When I do not enter text in password field but I do enter text into confirm password field
        And I check the error message of confirm password
        And I enter Password and confirm password from "student" account fullfiling all password requirements

    # ## TODO Implement populate datatable along with populateAssertDatatable to implement here
    Scenario Outline: Verify that Security Questions & Answer validations are working as expected for preprod with extra characters
        Given I have opened Achieve "UserCreationUrl"
        When I verify that if I Select Security Questions of the <account> account then I enter an empty string for the answers
        Then I enter the value of <answer> for each security question answer
        And I verify the content of the security question error messages displayed is <message> in preprod
        Examples:
        | account   | answer | message |
        | "student" | "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"    | "Limit of 150 characters reached" |

    Scenario Outline: Verify that Security Questions & Answer validations are working as expected for preprod with blank answers
        Given I have opened Achieve "UserCreationUrl"
        When I verify that if I Select Security Questions of the <account> account then I enter an empty string for the answers
        Then I enter the value of <answer> for each security question answer
        And I verify the content of the security question error messages displayed is <message> in preprod_blank
        Examples:
        | account   | answer | message |
        | "student" | ""     | "Must not be blank" |

    Scenario: Verify that the application should not allow to enter more than 150 characters in the Primary institution text box. Moreover on entering 150 characters, the application displays a message "Limit of 150 characters reached"
        Given I have opened Achieve "UserCreationUrl"
        Then I input too many characters into the Primary Institution field
        Then I verify the primary institution error message of too many characters
        And I verify the primary institution field does not allow more than 150 characters


    Scenario: Verify that on selecting a US college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box
        Given I have opened Achieve "UserCreationUrl"
        When I Select "Cottey College" in Primary Institution or School text box
        Then I verify the opt-in checkbox is checked

    Scenario: Verify that on selecting a Canada College in "Primary Institution or School" text box, the application should not automatically check the "OPT IN" check box
        Given I have opened Achieve "UserCreationUrl"
        When I Select "University of Toronto" in Primary Institution text box
        Then I verify the opt-in checkbox is not checked

    Scenario: Verify that Checkbox "Opt IN" is selectable and E-mail notification should generate
        Given I have opened Achieve "UserCreationUrl"
        Then I click on checkbox
        Then I verify the opt-in checkbox is checked

    Scenario: Verify that Privacy Notice Link redirects to appropriate page
        Given I have opened Achieve "UserCreationUrl"
        When I click on privacy notice link 
        Then I verify that I am redirected to privacy notice link page


    Scenario: Verify that Checkbox 'I have read and agree to the terms of use'
        Given I have opened Achieve "UserCreationUrl"
        When I click on user agreement checkbox
        Then I verify the Sign up button is disabled "Verify that Checkbox 'I have read and agree to the terms of use'"

    Scenario: Verify that Terms of use link redirects to appropriate page
        Given I have opened Achieve "UserCreationUrl"
        When I click on Terms of use link 
        Then I verify that I am redirected to terms of use page


    Scenario: Verify that without entering all Mandatory Fields (first name)
        Given I have opened Achieve "UserCreationUrl"
        When User "student" has filled all mandatory fields except first name 
        And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (first name)"

    Scenario: Verify that without entering all Mandatory Fields (lastname)
        Given I have opened Achieve "UserCreationUrl"
        When User "student" has filled all mandatory fields except last name
        And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (lastname)"

    Scenario Outline: Verify that without entering all Mandatory Fields (login, password)
        Given I have opened Achieve "UserCreationUrl"
        When User <login> has filled all mandatory fields except password
        When User has filled out the form with password: <password>
        And I verify the Sign up button is disabled <case>
        Examples:
        |login        | password | case |
        |"student"    | "ABab@12"| "if password is too short" |
        |"student"    | ""       | "if password is empty" |
        |"student"    | "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz12345678900987654321"  | "if password has no upper char"   |
        |"student"    | "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ12345678900987654321"  | "if password has no lower char"   |

    Scenario Outline: Verify that entering a password that is too long 
        Given I have opened Achieve "UserCreationUrl"
        When User <login> has filled all mandatory fields except password
        When User has filled out the form with password: <password>
        And I verify the password inputed <password> is not the same as the one that was allowed
        Examples:
        |login        | password |
        |"student"    | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@" |
        |"student"    | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@$"|


    Scenario: Verify the Terms of Purchase link directs to the page
        Given I have opened Achieve "UserCreationUrl"
        When I click on Terms of Purchase 
        And I verify that purchase link is directed to Terms of Purchase

    Scenario: Verify that without entering all Mandatory Fields (email)
        Given I have opened Achieve "UserCreationUrl"
        Then User "student" has filled all mandatory fields except email
        And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (email)"

    Scenario: Verify that Piracy Link redirects to appropriate page
        Given I have opened Achieve "UserCreationUrl"
        When I click on piracy link 
        Then I verify that piracy link is directed to piracy page

    Scenario: Verify that without entering all Mandatory Fields (institution)
        Given I have opened Achieve "UserCreationUrl"
        When User "student" has filled all mandatory fields except institution
        And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (institution)"

    Scenario: Verify that Privacy Link redirects to appropriate page
        Given I have opened Achieve "UserCreationUrl"
        When I click on privacy link 
        Then I verify that privacy link is directed to privacy page

    Scenario: Verify that without entering all Mandatory Fields (security questions)
        Given I have opened Achieve "UserCreationUrl"
        Then User "student"  has filled all mandatory fields except security questions and answers 
        And I verify the Sign up button is disabled "Verify that without entering all Mandatory Fields (security questions)"

    Scenario: Verify that macmillan learning redirects to appropriate page
        Given I have opened Achieve "UserCreationUrl"
        When I click on macmillan learning link 
        Then I verify that macmillan link is directed to macmillan learning page

    Scenario: Verify that on sharing e-mail to the e-mail address OPT-OUT@macmillanlearning.com link no -emial updates should be recived regarding macmillan updates 
        Given I have opened Achieve "UserCreationUrl"
        When I click on "OPT-OUT@macmillanlearning.com"
        And I verify it redirects to E-mail

    @admin-cancel
    Scenario: Verify that E-mail Address, first name, lastname, security question answers are all the same as when the user created the account
        Given I have opened Achieve "loginURL"
        When I have logged in as "media_producer_2"
        And I click on user menu 
        And I click on Account 
        And I verify that the account information for "media_producer_2" displayed is correct 

    @admin
    Scenario: Verify that aplication return to home page on clicking Cancel Button
        Given I have opened Achieve "loginURL"
        When I have logged in as "media_producer_2"
        And I click on user menu
        And I click on Account
        And I click on cancel button in User Acccount Menu
        And I verify home page is displayed

    @admin-save
    Scenario: Verify that Set Password functionality is working as expected
        Given I have opened Achieve "loginURL"
        When I have logged in as "media_producer_2"
        And I click on user menu
        And I click on Account
        And I click setpassword button
        And I click on newpassword

    @admin-cancel
    Scenario: Verify that Privacy Notice Link redirects to appropriate page
        Given I have opened Achieve "loginURL"
        When I have logged in as "media_producer_2"
        And I click on user menu
        And I click on Account
        And I verify that the account information for "media_producer_2" displayed is correct
        And I click on privacy notice link within user account view
        Then I verify that I am redirected to privacy notice link page
































