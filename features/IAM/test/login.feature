Feature: Login

    # Scenario: Verify that password info icon tooltip Information is consistent
    # to application behavior
    #     Given I have opened Achieve "signURL"
    #     And I click on the Sign In button on the Home page
    #     And I click on create an account button
    #
    #     When I hover on icon "i"
    #
    #     Then I verify that password info icon tooltip Information is consistent to application behavior

    # Scenario: Verify Forgot Link is redirecting to forgot password page
    #     Given I have opened Achieve "signURL"
    #     When I click on the Sign In button on the Home page
    #     And I click on forgot password link above password field text field
    #     Then I Verify Application should display forgot password page

    # Scenario: Verify that Existing registered account Sign In appropriately
    #     Given I have opened Achieve "signURL"
    #     When I click on the Sign In button on the Home page
    #     And  I have logged in as "media_producer_2"
    #     And I sign out of Achieve
    #     Then I Verify User Sign In with existing registered account appropriately


    # Scenario: Verify Help Link is present on the Sign In page and redirecting to appropriate page
    #     Given I have opened Achieve "signURL"
    #     When I click on the Sign In button on the Home page
    #     Then I click on help Link
    #     Then I verify the help page is displayed

    Scenario: Verify correct message is displayed if invalid attempts threshold
    is exceeded

        Given I have opened "achieve" "login"
        And I click on "course" system "home" feature "sign_in" element

        When I login with the following credentials
            |username                       | password    |
            |coursewareachieve@gmail.com    | password1   |
            |coursewareachieve@gmail.com    | password2   |
            |coursewareachieve@gmail.com    | password3   |
            |coursewareachieve@gmail.com    | password4   |
            |coursewareachieve@gmail.com    | password5   |
            |coursewareachieve@gmail.com    | password6   |

        Then I verify "iam" system "login" feature "error_text" element's "too_many_attempts" message is displayed


    Scenario:Verify whether user able to login without waiting for 15minutes

        Given I have opened "achieve" "login"
        And I click on "course" system "home" feature "sign_in" element

        When I have logged in as "admin_2"

        Then I verify "iam" system "login" feature "error_text" element's "too_many_attempts" message is displayed
