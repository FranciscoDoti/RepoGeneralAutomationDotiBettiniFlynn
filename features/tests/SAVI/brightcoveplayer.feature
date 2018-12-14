Feature: Brightcove Video Player

  Scenario: Verify that Brightcove Player is available at standalone link
    Given I open the standalone Brightcove Player
    Then I can play a video
    And I can use all the video control buttons
    And I can turn on audio description
    And the transcript button is available

  Scenario: Verify that Brightcove Player is available in ePub
    Given I open the VitalSource link
    Then I can play a video in the ePub
    And I can use all the video control buttons

  Scenario: Verify that Brightcove Player is available at SAVIPO2 dotme
    Given I login to sapling SAVIPO2
    When I open the assignment
    Then I can play a video in the assignment
    And I can use all the video control buttons
    And I can turn on audio description
    And the transcript button is available