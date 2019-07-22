Feature: Password validation

    Scenario: Verify that password field validations are working as expected

        Given I have opened Achieve "signURL"
        When I click on Forgot link

        And I enter all correct security anwers and I verify the following message
            | security_questions  | answers  | verify                                                                                                                                                                                                              |
            | answer_text         | answer   | An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again. | 
            
                                                                                                                 |



