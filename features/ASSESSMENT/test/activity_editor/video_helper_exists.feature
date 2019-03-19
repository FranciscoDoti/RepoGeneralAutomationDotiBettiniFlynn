Feature: Video Player Exists
    Scenario: For empty assignments there is a video player on the assignment page

    Given I have opened "sapling" "login"
        And I have logged into Sapling as "raptoradmin" with password "fasterthansixmill"
        And I have opened "sapling" "empty_activity"
        And I sleep "3" seconds

    Then I verify "assessment" "activity_editor" has "video" element
