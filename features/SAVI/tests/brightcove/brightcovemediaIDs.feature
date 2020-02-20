@SAVI
@Brightcove

Feature: Brightcove Audio, Video Player

Scenario Outline: Test a list of Video IDs in the Brightcove player

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
            | "5714432916001" |
            | "6011256190001" |
            | "5754262803001" |
            | "2805448759001" |
            | "5755098968001" |
            | "5757871649001" |
            | "5758375778001" |

Scenario Outline: Test a list of Audio IDs in the Brightcove player

    Given I load a <audioId> in the audio player
    When I click the play button in the bottom bar of the player
    Then the audio should begin playing
    When I click the pause button in the bottom bar of the player
    Then the video should pause

        Examples:
            | audioId         |
            | "5569398396001" |
            | "5816753538001" |
            | "4367582292001" |
            | "4356415673001" |
            | "2680586150001" |
            | "4357890491001" |
            | "4364272257001" |
            | "4367448944001" |
            | "4367496710001" |
            | "4367572094001" |
            | "4367496797001" |
            | "4367496716001" |
            | "4367446970001" |