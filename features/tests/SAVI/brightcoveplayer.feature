Feature: Brightcove Video Player

  Scenario: Verify that Brightcove Player is available at standalone link
    Given I open the standalone Brightcove Player
    Then I can play a video
    Then I can click all the control buttons

  Scenario: Verify that Brightcove Player is available at SAVIPO2 dotme
    Given I login to sapling SAVIPO2
    When I open the assignment
    Then I can play a video in the assignment