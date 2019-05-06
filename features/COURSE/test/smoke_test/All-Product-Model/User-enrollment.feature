Feature: Enroll into achieve system

    Scenario: Verify that user is able to create a new account for Admin, Media Producer, Media Editor, Customer Support, Paid access Code Creators, Instructor & Student

        Given I click login to the Achieve product 
        And I click on "course" system "main" feature "create_account" element

        Then I verify the following information is present
            | page_object                | 
            | first_name                 | 
            | last_name                  | 
            | email                      | 
            | password                   |
            | confirm_password           |
            | Security_Question_1        |
            | Security_Question_1_Answer |
            | Security_Question_2        |
            | Security_Question_2_Answer |
            | Security_Question_3        |
            | Security_Question_3_Answer |
            | institution                |
        
        When I fill the form to create account
            | page_object                | value                                   |
            | first_name                 | macmillan                               |
            | last_name                  | user                                    |
            | email                      | macmillanuser2@gmail.com                |
            | password                   | ABCabc@123                              |
            | confirm_password           | ABCabc@123                              |
            | Security_Question_1        | What is the name of your favorite pet?  |
            | Security_Question_1_Answer | answer                                  |
            | Security_Question_2        | What is your favorite movie?            |
            | Security_Question_2_Answer | answer                                  |
            | Security_Question_3        | What is your favorite color?            |
            | Security_Question_3_Answer | answer                                  |
            | institution                | Miami University                        |
        
       Then I verify email notification is sent to "macmillanuser@gmail.com" user "ABCabc@123" password


