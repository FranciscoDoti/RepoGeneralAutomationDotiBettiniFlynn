@SAVI-4785

Feature: Brightcove Audio, Video Player

Scenario Outline: Test a list of media IDs in the Brightcove player

    Given I load a <videoId> in the video player
    When I click the play button in the center of the player
    Then the video should begin playing
    When I click the pause button in the bottom bar of the player
    Then the video should pause

        Examples:
            | videoId         |
            | "5758272834001" |
            | "5240257271001" |
            | "5714430519001" |
            | "5755680903001" |
            | "5240257270001" |
            | "3936552724001" |
