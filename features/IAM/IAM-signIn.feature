Feature: Sign in

    # Scenario: Verify that password info icon tooltip Information is consistent to application behavior
    #     Given I have opened Achieve "signURL"
    #     When I click on sign In button on top right corner
    #     And I click on create an account button
    #     Then I hover on icon "i"
    #     Then I verify that password info icon tooltip Information is consistent to application behavior

    # Scenario: Verify Forgot Link is redirecting to forgot password page
    #     Given I have opened Achieve "signURL"
    #     When I click on sign In button on top right corner
    #     And I click on forgot password link above password field text field
    #     Then I Verify Application should display forgot password page

    # Scenario: Verify that Existing registered account Sign In appropriately
    #     Given I have opened Achieve "signURL"
    #     When I click on sign In button on top right corner
    #     And  I have logged in as "media_producer_2"
    #     And I sign out of Achieve
    #     Then I Verify User Sign In with existing registered account appropriately


    # Scenario: Verify Help Link is present on the Sign In page and redirecting to appropriate page
    #     Given I have opened Achieve "signURL"
    #     When I click on sign In button on top right corner
    #     Then I click on help Link
    #     Then I verify the help page is displayed
    @foo
    Scenario: Verify that invalid username and password attempt for more than 3 times will now allow user to login for 15 minutes using any browser or system
        Given I have opened Achieve
        When I click on sign In button on top right corner
        And I login using invalid login credentials for 6 times
            |UserName        | Password    |
            |txt_username    | coursewareachieve@gmail.com |
            |txt_password    | password1   |
            |sign_in         | click       |
            |txt_username    | coursewareachieve@gmail.com |
            |txt_password    | password2   |
            |sign_in         | click       |
            |txt_username    | coursewareachieve@gmail.com  |
            |txt_password    | password3   |
            |sign_in         | click       |
            |txt_username    | coursewareachieve@gmail.com |
            |txt_password    | password4   |
            |sign_in         | click       |
            |txt_username    | coursewareachieve@gmail.com |
            |txt_password    | password5   |
            |sign_in         | click       |
            |txt_username    | coursewareachieve@gmail.com |
            |txt_password    | password6   |
            |sign_in         | click       |
        Then I login with following credentials:
        Then I Verify that "Too many login attempts. Wait 15 minutes and try again" message is displayed


  #  Scenario:Verify whether user able to login without waiting for 15minutes
  #      Given I have opened Achieve "signURL"
    #    When I click on sign In button on top right corner
    #    And I have logged in as "admin_alt"
    #    Then I Verify that "Too many login attempts. Wait 15 minutes and try again" message is displayed
